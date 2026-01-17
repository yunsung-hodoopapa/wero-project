"use client";
import React from "react";
import Image from "next/image";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface MultiLangText {
  ko: string;
  en: string;
  de?: string;
  zh?: string;
}

const Contact: React.FC = () => {
  const { lang } = useLanguage();
  const getText = (text: MultiLangText) => text[lang] || text.en || text.ko;

  const TEXTS = {
    subtitle: {
      ko: "현장에서 결과를 증명할 준비가 되셨나요?\n신뢰와 실행에 기반한 파트너십을 위해 연락주세요.",
      en: "Ready to prove results in the field?\nContact us for a partnership built on trust and action.",
      de: "Bereit, Ergebnisse vor Ort zu beweisen?\nKontaktieren Sie uns für eine Partnerschaft basierend auf Vertrauen und Handeln.",
      zh: "准备好在现场证明结果了吗？\n联系我们，建立基于信任和行动的合作伙伴关系。",
    },
    address: {
      ko: "서울특별시 강남구 크리에이티브 애비뉴 123",
      en: "123 Creative Avenue, Gangnam-gu, Seoul, South Korea",
      de: "123 Creative Avenue, Gangnam-gu, Seoul, Südkorea",
      zh: "韩国首尔江南区创意大道123号",
    },
    responseTime: {
      ko: "24시간 이내 답변 드립니다.",
      en: "Response within 24 hours.",
      de: "Antwort innerhalb von 24 Stunden.",
      zh: "24小时内回复。",
    },
    inquiries: {
      ko: "문의",
      en: "INQUIRIES",
      de: "ANFRAGEN",
      zh: "咨询",
    },
    addressLabel: {
      ko: "주소",
      en: "ADDRESS",
      de: "ADRESSE",
      zh: "地址",
    },
  };

  return (
    <footer
      id="contact"
      className="bg-brand-black text-white pt-32 pb-8 border-t border-white/10"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Left: CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
                Let's <br /> Start{" "}
                <span className="text-brand-accent">Execution.</span>
              </h2>
              <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                {getText(TEXTS.subtitle)
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
              </p>
            </div>

            <div className="mt-16">
              <a
                href="mailto:master@bbpartners.co.kr"
                className="inline-flex items-center gap-4 text-2xl md:text-3xl font-bold hover:text-brand-accent transition-colors duration-300 group"
              >
                master@bbpartners.co.kr
                <ArrowUpRight
                  size={32}
                  className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          {/* Right: Info Card */}
          <div className="glass p-10 md:p-14 hover-glow">
            <div className="space-y-14">
              <div>
                <h4 className="text-xs font-bold text-brand-accent/80 uppercase tracking-widest mb-5">
                  {getText(TEXTS.addressLabel)}
                </h4>
                <div className="flex items-start gap-4">
                  <MapPin
                    className="text-brand-accent shrink-0 mt-1"
                    size={22}
                  />
                  <p className="text-xl leading-relaxed">
                    {getText(TEXTS.address)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-brand-accent/80 uppercase tracking-widest mb-5">
                  {getText(TEXTS.inquiries)}
                </h4>
                <div className="flex items-start gap-4">
                  <Mail className="text-brand-accent shrink-0 mt-1" size={22} />
                  <div>
                    <p className="text-xl font-medium">
                      master@bbpartners.co.kr
                    </p>
                    <p className="text-sm text-gray-500 mt-3">
                      {getText(TEXTS.responseTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/images/bblogo_white.png"
              alt="BB Partners"
              width={140}
              height={36}
              className="object-contain"
            />
          </div>
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            © 2025 BB PARTNERS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
