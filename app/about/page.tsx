import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import About from "../../components/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "더블비 파트너스는 Blood Brother의 마인드로 럭셔리 브랜드 경험을 완성하는 실행 중심의 파트너입니다.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
      <Navbar />
      <main>
        <About />
      </main>
    </div>
  );
}
