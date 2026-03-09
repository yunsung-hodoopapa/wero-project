"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 헬퍼: 이미지 한 장을 스토리지에 업로드하고 Public URL 반환
async function uploadImageToStorage(file: File): Promise<string> {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

  return publicUrl;
}

// 1. 갤러리 이미지 1장 업로드 (순차 호출용)
export async function uploadGalleryImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "파일이 없습니다." };
    }
    const url = await uploadImageToStorage(file);
    return { success: true, url };
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return { success: false, error: "갤러리 이미지 업로드에 실패했습니다." };
  }
}

// 2. 포트폴리오 메인 저장 (대표 이미지 1장 + 메타데이터 + 갤러리 URL 배열)
export async function submitPortfolio(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const projectYear = formData.get("project_year") as string;
    const client = formData.get("client") as string;
    const venue = formData.get("venue") as string;
    const tagsRaw = formData.get("tags") as string;
    const galleryUrlsRaw = formData.get("gallery_urls") as string;
    const image = formData.get("image") as File;

    if (!title || !image || image.size === 0) {
      return { success: false, error: "제목과 이미지는 필수 항목입니다." };
    }

    // 대표 이미지 업로드
    const imageUrl = await uploadImageToStorage(image);

    // 태그 파싱
    let tags: string[] = [];
    if (tagsRaw) {
      try {
        tags = JSON.parse(tagsRaw);
      } catch {
        tags = [];
      }
    }

    // 갤러리 URL 파싱
    let galleryUrls: string[] = [];
    if (galleryUrlsRaw) {
      try {
        galleryUrls = JSON.parse(galleryUrlsRaw);
      } catch {
        galleryUrls = [];
      }
    }

    // DB 저장
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("portfolios").insert([
      {
        title,
        description: description || null,
        image_url: imageUrl,
        project_year: projectYear || null,
        client: client || null,
        venue: venue || null,
        tags: tags.length > 0 ? tags : null,
        gallery: galleryUrls.length > 0 ? galleryUrls : null,
      },
    ]);

    if (dbError) {
      console.error("DB Insert Error:", dbError);
      return { success: false, error: "포트폴리오 정보 저장에 실패했습니다." };
    }

    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "서버 에러가 발생했습니다." };
  }
}

// 3. 포트폴리오 목록 조회
export async function getPortfolios() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch Error:", error);
    return [];
  }
  return data || [];
}

// 4. 포트폴리오 삭제 (DB + 스토리지)
export async function deletePortfolio(id: string) {
  try {
    const supabase = await createClient();

    // 먼저 해당 레코드의 이미지 URL들을 가져옴
    const { data: portfolio, error: fetchError } = await supabase
      .from("portfolios")
      .select("image_url, gallery")
      .eq("id", id)
      .single();

    if (fetchError || !portfolio) {
      return { success: false, error: "포트폴리오를 찾을 수 없습니다." };
    }

    // 스토리지에서 이미지 파일 삭제
    const urlsToDelete: string[] = [portfolio.image_url, ...(portfolio.gallery || [])];
    const pathsToDelete = urlsToDelete
      .map((url) => {
        const match = url.match(/portfolio-images\/(.+)$/);
        return match ? match[1] : null;
      })
      .filter(Boolean) as string[];

    if (pathsToDelete.length > 0) {
      await supabase.storage.from("portfolio-images").remove(pathsToDelete);
    }

    // DB에서 레코드 삭제
    const { error: dbError } = await supabase
      .from("portfolios")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("DB Delete Error:", dbError);
      return { success: false, error: "포트폴리오 삭제에 실패했습니다." };
    }

    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "삭제 중 서버 에러가 발생했습니다." };
  }
}
