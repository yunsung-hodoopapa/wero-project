import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Services from "../../components/Services";

export const metadata: Metadata = {
  title: "Business",
  description:
    "이벤트 기획, 차량 관리, 프로페셔널 스태핑, 렌탈 서비스까지 - 럭셔리 브랜드 경험의 모든 것을 제공합니다.",
};

export default function ServicesPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
      <Navbar />
      <main className="pt-20">
        <Services />
      </main>
    </div>
  );
}
