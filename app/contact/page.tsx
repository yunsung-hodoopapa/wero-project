import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Contact from "../../components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "더블비 파트너스에 문의하세요. 럭셔리 브랜드 경험 파트너십을 시작할 준비가 되어 있습니다.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
    </div>
  );
}
