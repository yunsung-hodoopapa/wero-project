"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface MultiLangText {
  ko: string;
  en: string;
  de?: string;
  zh?: string;
}

// Custom hook for scroll animation
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// 다국어 텍스트 블록
const TextBlock: React.FC<{ text: MultiLangText }> = ({ text }) => {
  const { lang } = useLanguage();
  const content = text[lang] || text.en || text.ko;

  return (
    <p
      className={`text-lg md:text-xl leading-loose break-keep transition-colors duration-300 ${
        lang === "ko" ? "text-gray-300" : "text-brand-accent font-heading"
      }`}
    >
      {content.split("\n").map((line, i) => (
        <span key={i} className="block mb-1">
          {line}
        </span>
      ))}
    </p>
  );
};

// 텍스트 데이터
const TEXTS = {
  whoWeAre: {
    ko: `더블비 파트너스는 Blood Brother의 마인드 위에 세워진 Best Brand Partner 입니다.\n우리는 15년이 넘는 럭셔리 & 프리미엄 브랜드 경험을 바탕으로,\n브랜드의 목표를 현실로 만드는 현장 중심 실행 파트너십을 지향합니다.`,
    en: `BB Partners is a Best Brand Partner built upon the mindset of Blood Brother.\nWith over 15 years of experience across luxury and premium brands,\nwe strive to be a field-driven execution partnership that turns brand goals into reality.`,
    de: `BB Partners ist ein erstklassiger Markenpartner, der auf der Mentalität von Blood Brother aufgebaut ist.\nMit über 15 Jahren Erfahrung bei Luxus- und Premiummarken\nstreben wir eine praxisorientierte Umsetzungspartnerschaft an, die Markenziele in die Realität umsetzt.`,
    zh: `BB Partners是建立在Blood Brother理念之上的最佳品牌合作伙伴。\n凭借超过15年的奢侈品和高端品牌经验，\n我们致力于成为将品牌目标转化为现实的现场执行合作伙伴。`,
  },
  vision: {
    ko: `더블비 파트너스의 비전은 기존의 방식을 따라가는 것이 아니라,\n누구보다 먼저 기준을 정의하고 그 기준을 실행으로 증명하는 조직이 되는 것입니다.\n우리는 럭셔리 경험의 실행 기준이 되어, 업계의 방향을 선도합니다.`,
    en: `The vision of BB Partners is not to follow existing standards,\nbut to define new standards first — and prove them through execution.\nWe aim to become the execution benchmark in luxury brand experiences and a partner that leads the direction of the industry.`,
    de: `Die Vision von BB Partners ist es nicht, bestehenden Standards zu folgen,\nsondern neue Standards zuerst zu definieren — und sie durch Umsetzung zu beweisen.\nWir wollen zum Maßstab für die Umsetzung von Luxusmarkenerlebnissen werden.`,
    zh: `BB Partners的愿景不是遵循现有标准，\n而是首先定义新标准——并通过执行来证明它们。\n我们的目标是成为奢侈品牌体验的执行标杆，引领行业发展方向。`,
  },
  mission: {
    ko: `더블비 파트너스의 미션은 어떤 상황에서도 변명하지 않고, 실행으로 답하는 것입니다.\n복잡한 요구와 높은 긴장도의 현장에서도 우리는 설명보다 행동을 선택합니다.\n모든 서비스 영역에서 결과로 신뢰를 증명하는 실행 파트너입니다.`,
    en: `The mission of BB Partners is to respond through execution — without excuses, in any situation.\nEven in complex demands and high-pressure environments, we choose action over explanation.\nAcross every service domain, BB Partners stands as an execution partner that proves trust through results.`,
    de: `Die Mission von BB Partners ist es, durch Umsetzung zu antworten — ohne Ausreden, in jeder Situation.\nSelbst bei komplexen Anforderungen wählen wir Handeln statt Erklärungen.\nBB Partners steht als Umsetzungspartner, der Vertrauen durch Ergebnisse beweist.`,
    zh: `BB Partners的使命是通过执行来回应——在任何情况下都不找借口。\n即使在复杂的需求和高压环境中，我们也选择行动而不是解释。\nBB Partners是一个通过结果证明信任的执行伙伴。`,
  },
};

const CORE_VALUES = [
  {
    title: "Bold",
    text: {
      ko: "결단력 있게 판단하고, 책임 있게 실행합니다.",
      en: "Fully understanding the situation and making accountable decisions without hesitation.",
      de: "Entscheidungen mit Verantwortung treffen und entschlossen umsetzen.",
      zh: "果断判断，负责任地执行。",
    },
    delay: "delay-100",
  },
  {
    title: "Built on Execution",
    text: {
      ko: "말이 아닌 실행으로 증명합니다.",
      en: "Results created in the field are the only true form of trust.",
      de: "Ergebnisse vor Ort sind die einzige wahre Form des Vertrauens.",
      zh: "用执行而非言语来证明。",
    },
    delay: "delay-200",
  },
  {
    title: "Partnership",
    text: {
      ko: "같은 편에서 끝까지 함께합니다.",
      en: "We share responsibility until the outcome is complete.",
      de: "Wir teilen die Verantwortung bis zum Abschluss.",
      zh: "站在同一边，一起走到最后。",
    },
    delay: "delay-300",
  },
];

const About: React.FC = () => {
  const { lang } = useLanguage();
  const whoWeAreRef = useInView(0.2);
  const visionRef = useInView(0.2);
  const missionRef = useInView(0.2);
  const valuesRef = useInView(0.15);

  const getText = (textObj: MultiLangText) =>
    textObj[lang] || textObj.en || textObj.ko;

  return (
    <section id="about" className="py-40 bg-brand-black relative">
      <div className="container mx-auto px-6">
        {/* WHO WE ARE */}
        <div
          ref={whoWeAreRef.ref}
          className={`max-w-4xl mb-40 transition-all duration-700 ${
            whoWeAreRef.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-brand-accent font-bold tracking-widest uppercase mb-8 text-xs md:text-sm">
            WHO WE ARE
          </h3>
          <TextBlock text={TEXTS.whoWeAre} />
        </div>

        {/* VISION & MISSION Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 border-t border-white/10 pt-20">
          {/* VISION */}
          <div
            ref={visionRef.ref}
            className={`flex flex-col items-start text-left transition-all duration-700 delay-100 ${
              visionRef.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-brand-accent font-bold tracking-widest uppercase mb-8 text-xs md:text-sm">
              VISION
            </h3>
            <div className="mb-10">
              <h4 className="text-3xl md:text-4xl font-heading font-semibold text-white uppercase tracking-wide leading-snug">
                Be the first. <br />
                Be the lead.
              </h4>
            </div>
            <TextBlock text={TEXTS.vision} />
          </div>

          {/* MISSION */}
          <div
            ref={missionRef.ref}
            className={`flex flex-col items-start text-left transition-all duration-700 delay-200 ${
              missionRef.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-brand-accent font-bold tracking-widest uppercase mb-8 text-xs md:text-sm">
              MISSION
            </h3>
            <div className="mb-10">
              <h4 className="text-3xl md:text-4xl font-heading font-semibold text-white uppercase tracking-wide leading-snug">
                Execution <br />
                Without Excuses.
              </h4>
            </div>
            <TextBlock text={TEXTS.mission} />
          </div>
        </div>

        {/* CORE VALUES */}
        <div
          ref={valuesRef.ref}
          className={`mt-40 transition-all duration-700 ${
            valuesRef.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-brand-accent font-bold tracking-widest uppercase mb-16 text-xs md:text-sm text-left">
            CORE VALUES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, idx) => (
              <div
                key={idx}
                className={`bg-brand-dark p-10 border border-white/5 hover:border-brand-accent/50 
                  transition-all duration-500 group relative overflow-hidden
                  ${valuesRef.isVisible ? `opacity-100 translate-y-0 ${value.delay}` : "opacity-0 translate-y-4"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <h4 className="text-2xl md:text-3xl font-heading font-semibold text-white uppercase tracking-wide mb-6 group-hover:text-brand-accent transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p
                    className={`text-base md:text-lg leading-relaxed break-keep ${
                      lang === "ko"
                        ? "text-gray-300"
                        : "text-brand-accent font-heading"
                    }`}
                  >
                    {getText(value.text)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
