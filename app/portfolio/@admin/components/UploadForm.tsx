"use client";

import { useState } from "react";
import {
  submitPortfolio,
  uploadGalleryImage,
} from "@/app/actions/portfolio";
import imageCompression from "browser-image-compression";

export default function UploadForm({ embedded = false }: { embedded?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [progressMsg, setProgressMsg] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const addTag = () => {
    const trimmed = tagInput.trim().toUpperCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryFiles(Array.from(e.target.files));
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/webp" as const,
    };
    const compressedBlob = await imageCompression(file, options);
    return new File(
      [compressedBlob],
      file.name.replace(/\.[^/.]+$/, ".webp"),
      { type: "image/webp" },
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setProgressMsg("");

    const formData = new FormData(e.currentTarget);
    const originalImage = formData.get("image") as File;

    // 1. 대표 이미지 압축
    if (originalImage && originalImage.size > 0) {
      try {
        setProgressMsg("대표 이미지 압축 중...");
        const compressedFile = await compressImage(originalImage);
        formData.set("image", compressedFile);
      } catch (error) {
        console.error("이미지 압축 실패:", error);
        setErrorMsg("이미지 처리 중 오류가 발생했습니다.");
        setLoading(false);
        return;
      }
    }

    // 2. 갤러리 이미지 순차 업로드 (1장씩)
    const galleryUrls: string[] = [];
    if (galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        try {
          setProgressMsg(
            `갤러리 이미지 업로드 중... (${i + 1}/${galleryFiles.length})`,
          );
          const compressed = await compressImage(galleryFiles[i]);
          const galleryFormData = new FormData();
          galleryFormData.set("file", compressed);
          const result = await uploadGalleryImage(galleryFormData);
          if (result.success && result.url) {
            galleryUrls.push(result.url);
          } else {
            setErrorMsg(
              result.error ||
                `갤러리 이미지 ${i + 1}번 업로드에 실패했습니다.`,
            );
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("갤러리 이미지 처리 실패:", error);
          setErrorMsg(`갤러리 이미지 ${i + 1}번 처리 중 오류가 발생했습니다.`);
          setLoading(false);
          return;
        }
      }
    }

    // 3. 태그 + 갤러리 URL 배열을 formData에 추가
    formData.set("tags", JSON.stringify(tags));
    formData.set("gallery_urls", JSON.stringify(galleryUrls));

    // 4. 최종 저장
    setProgressMsg("포트폴리오 저장 중...");
    const result = await submitPortfolio(formData);

    setLoading(false);
    setProgressMsg("");

    if (result.success) {
      alert("업로드가 완료되었습니다!");
      window.history.back();
    } else {
      setErrorMsg(result.error || "업로드 중 오류가 발생했습니다.");
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* 연도 & 고객사 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            연도 (필수)
          </label>
          <input
            name="project_year"
            type="text"
            required
            placeholder="예: 2025/03"
            className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            고객사 (필수)
          </label>
          <input
            name="client"
            type="text"
            required
            placeholder="예: BMW Korea"
            className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-black focus:border-black"
          />
        </div>
      </div>

      {/* 제목 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          프로젝트명 (필수)
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="예: BMW Excellence Lounge 2025"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-black focus:border-black"
        />
      </div>

      {/* 장소 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          장소 (필수)
        </label>
        <input
          name="venue"
          type="text"
          required
          placeholder="예: Club D Chungdam / Playa Lounge"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-black focus:border-black"
        />
      </div>

      {/* 설명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          설명글 (선택)
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="프로젝트에 대한 간단한 설명을 적어주세요."
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-black focus:border-black resize-none"
        ></textarea>
      </div>

      {/* 태그 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          태그
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="입력 후 Enter (예: EVENT)"
            className="flex-1 p-3 border border-gray-300 rounded-md text-black focus:ring-black focus:border-black"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black text-sm"
          >
            추가
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full border border-gray-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-gray-400 hover:text-red-500 ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 대표 이미지 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대표 이미지 (필수)
        </label>
        <input
          name="image"
          type="file"
          required
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-md text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
        />
      </div>

      {/* 갤러리 이미지 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          갤러리 이미지 (선택, 여러 장 가능)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleGalleryChange}
          className="w-full p-2 border border-gray-300 rounded-md text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
        />
        {galleryFiles.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            {galleryFiles.length}장 선택됨
          </p>
        )}
      </div>

      {/* 프로그레스 표시 */}
      {progressMsg && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm border border-blue-200 flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {progressMsg}
        </div>
      )}

      <div className="pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold flex justify-center items-center transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
        >
          {loading ? "업로드 중..." : "업로드 하기"}
        </button>
      </div>
    </form>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl relative my-8">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
          disabled={loading}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 border-b pb-4">
          새 포트폴리오 업로드
        </h2>
        {formContent}
      </div>
    </div>
  );
}
