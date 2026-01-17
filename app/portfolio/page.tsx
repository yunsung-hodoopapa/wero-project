import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Works from "../../components/Works";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "아우디, BMW 등 프리미엄 브랜드와 함께한 럭셔리 이벤트 및 브랜드 경험 포트폴리오.",
};

export default function PortfolioPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
      <Navbar />
      <main className="pt-20">
        <Works />
      </main>
    </div>
  );
}
