import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Works, { Project } from "../../components/Works";
import { MobileRedirect } from "../../components/MobileRedirect";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "BMW, Audi 등 프리미엄 자동차 브랜드와 함께한 럭셔리 이벤트 포트폴리오. FRIEZE Seoul, BMW Ladies Championship, 신차 발표회 등 주요 프로젝트 수행.",
  keywords: [
    "BMW 이벤트",
    "Audi 행사",
    "자동차 전시회",
    "FRIEZE Seoul",
    "BMW Ladies Championship",
    "신차 발표회",
    "COEX 전시",
    "KINTEX 행사",
    "DDP 이벤트",
    "럭셔리 브랜드 포트폴리오",
  ],
  alternates: {
    canonical: "https://bbpartners.co.kr/portfolio",
  },
  openGraph: {
    title: "포트폴리오 | BB Partners",
    description:
      "프리미엄 자동차 브랜드와 함께한 럭셔리 이벤트 및 브랜드 경험 포트폴리오.",
    url: "https://bbpartners.co.kr/portfolio",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: false });

  const customProjects: Project[] = (portfolios || []).map((p: any) => {
    const fallbackYear = (() => {
      const d = new Date(p.created_at);
      return `${d.getFullYear()}/${d.getMonth() + 1}`;
    })();
    return {
      year: p.project_year || fallbackYear,
      title: p.title,
      subtitle: p.description || p.venue || "",
      client: p.client || "",
      venue: p.venue || "",
      tags: p.tags || [],
      img: p.image_url,
      gallery: p.gallery || [],
    };
  });

  return (
    <MobileRedirect targetSection="portfolio">
      <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
        <Navbar />
        <main className="pt-20">
          <Works dbProjects={customProjects} />
        </main>

        {/* 임시 테스트를 위한 숨겨진 관리자 접속 버튼 */}
        <a
          href="/portfolio?admin=true"
          className="fixed bottom-4 right-4 z-40 w-8 h-8 opacity-0 hover:opacity-100 flex items-center justify-center bg-gray-500 rounded-full text-white cursor-pointer"
        >
          A
        </a>
      </div>
    </MobileRedirect>
  );
}
