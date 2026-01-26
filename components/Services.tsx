"use client";
import React from "react";
import Image from "next/image";
import { Lightbulb, Car, UserCheck, Armchair } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface MultiLangText {
  ko: string;
  en: string;
  de?: string;
  zh?: string;
}

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  items: MultiLangText[];
  img: string;
}

const Services: React.FC = () => {
  const { lang } = useLanguage();

  const getText = (text: MultiLangText) => text[lang] || text.en || text.ko;

  const sectionDesc: MultiLangText = {
    ko: "기획부터 현장 실행까지 종합 솔루션을 제공합니다.",
    en: "We provide comprehensive solutions from planning to field execution.",
    de: "Wir bieten umfassende Lösungen von der Planung bis zur Umsetzung vor Ort.",
    zh: "我们提供从规划到现场执行的综合解决方案。",
  };

  const learnMore: MultiLangText = {
    ko: "자세히 보기",
    en: "Learn More",
    de: "Mehr erfahren",
    zh: "了解更多",
  };

  const services: ServiceItem[] = [
    {
      icon: <Lightbulb size={32} />,
      title: "EXPERIENTIAL / CONTENTS CREATIVES",
      items: [
        {
          ko: "몰입형 브랜드 경험의 컨셉, 디자인 및 실행",
          en: "Concept, Design and execution of immersive brand experiences",
          de: "Konzept, Design und Umsetzung immersiver Markenerlebnisse",
          zh: "沉浸式品牌体验的概念、设计和执行",
        },
        {
          ko: "브랜드 파트너십 / 셀러브리티 & 인플루언서 커뮤니케이션",
          en: "Brand partnership / Celebrity & Influencer communication",
          de: "Markenpartnerschaft / Prominenten- & Influencer-Kommunikation",
          zh: "品牌合作 / 名人和网红沟通",
        },
        {
          ko: "소셜 미디어 마케팅 / 디지털 콘텐츠 제작",
          en: "Social media marketing / Digital contents creation",
          de: "Social-Media-Marketing / Erstellung digitaler Inhalte",
          zh: "社交媒体营销 / 数字内容创作",
        },
      ],
      img: "/images/service-experiential.jpg",
    },
    {
      icon: <Car size={32} />,
      title: "VEHICLE MANAGEMENT",
      items: [
        {
          ko: "전문 차량 물류",
          en: "Professional logistics",
          de: "Professionelle Logistik",
          zh: "专业物流",
        },
        {
          ko: "카 디테일링 / 쇼케이스 세팅",
          en: "Car detailing / Showcase setting",
          de: "Fahrzeugaufbereitung / Showcase-Einrichtung",
          zh: "汽车美容 / 展示设置",
        },
        {
          ko: "법인 차량 관리",
          en: "Company vehicle management",
          de: "Fuhrparkmanagement",
          zh: "公司车辆管理",
        },
      ],
      img: "/images/service-vehicle.jpg",
    },
    {
      icon: <UserCheck size={32} />,
      title: "PROFESSIONAL STAFFING",
      items: [
        {
          ko: "브랜드 경험 & 운영 스태프",
          en: "Brand Experience & Operation staff",
          de: "Markenerlebnis- & Betriebspersonal",
          zh: "品牌体验和运营人员",
        },
        {
          ko: "VIP 쇼퍼 / 프리미엄 발렛",
          en: "VIP Chauffeur / Premium Valet",
          de: "VIP-Chauffeur / Premium-Valet",
          zh: "VIP司机 / 高级代客泊车",
        },
        {
          ko: "이그제큐티브 프로텍션 / 드라이빙 인스트럭터",
          en: "Executive Protection / Driving Instructor",
          de: "Personenschutz / Fahrlehrer",
          zh: "行政保护 / 驾驶教练",
        },
      ],
      img: "/images/service-staffing.jpg",
    },
    {
      icon: <Armchair size={32} />,
      title: "RENTAL SERVICE",
      items: [
        {
          ko: "디지털 디바이스 렌탈",
          en: "Digital devices",
          de: "Digitale Geräte",
          zh: "数字设备",
        },
        {
          ko: "이벤트용 럭셔리 가구 렌탈",
          en: "Luxury furniture rental for events",
          de: "Luxusmöbelvermietung für Veranstaltungen",
          zh: "活动豪华家具租赁",
        },
      ],
      img: "/images/service-rental.jpg",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-brand-dark relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/business-bg.jpg"
          alt="Business Background"
          fill
          sizes="100vw"
          className="object-cover opacity-20 object-[center_bottom]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-dark/80"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter">
            EXPERIENTIAL / <br />
            <span className="text-brand-accent">CONTENTS CREATIVES</span>
          </h2>
          <p className="text-gray-400 max-w-sm mt-6 md:mt-0 pb-2 text-right">
            {getText(sectionDesc)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="group relative min-h-[450px] overflow-hidden border border-white/5 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 ease-out
                    grayscale brightness-[0.3] 
                    group-hover:grayscale-0 group-hover:brightness-[0.6] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div
                    className="text-brand-accent bg-brand-accent/10 backdrop-blur-sm p-3 rounded-full border border-brand-accent/20 
                    group-hover:bg-brand-accent group-hover:text-black transition-all duration-500"
                  >
                    {s.icon}
                  </div>
                  <span
                    className="text-white/10 font-display text-5xl font-bold 
                    group-hover:text-brand-accent/30 transition-colors duration-500"
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3
                    className="text-xl md:text-2xl font-display font-bold text-white mb-4 
                    group-hover:text-brand-accent transition-colors duration-300"
                  >
                    {s.title}
                  </h3>
                  <ul className="space-y-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    {s.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-300 text-sm flex items-start gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 bg-brand-accent mt-1.5 rounded-full shrink-0 
                          group-hover:scale-125 transition-transform duration-300"
                        ></span>
                        {getText(item)}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-6 flex items-center gap-2 text-brand-accent text-xs font-bold tracking-widest uppercase
                    opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100"
                  >
                    <span>{getText(learnMore)}</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-brand-accent/0 group-hover:border-brand-accent/50 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
