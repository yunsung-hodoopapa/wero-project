"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 지원 언어: 한국어, 영어, 독일어, 중국어
export type Language = "ko" | "en" | "de" | "zh";

export interface MultiLangText {
  ko: string;
  en: string;
  de?: string;
  zh?: string;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  cycleLang: () => void;
  t: (texts: MultiLangText) => string;
  langLabel: string;
}

const LANGUAGE_LABELS: Record<Language, string> = {
  ko: "한국어",
  en: "English",
  de: "Deutsch",
  zh: "中文",
};

const LANGUAGE_ORDER: Language[] = ["ko", "en", "de", "zh"];

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "bbpartners-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("ko");
  const [isHydrated, setIsHydrated] = useState(false);

  // localStorage에서 언어 설정 복원
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && LANGUAGE_ORDER.includes(stored)) {
      setLangState(stored);
    }
    setIsHydrated(true);
  }, []);

  // 언어 변경 시 localStorage에 저장
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  };

  // 언어 순환 (KO → EN → DE → ZH → KO)
  const cycleLang = () => {
    const currentIndex = LANGUAGE_ORDER.indexOf(lang);
    const nextIndex = (currentIndex + 1) % LANGUAGE_ORDER.length;
    setLang(LANGUAGE_ORDER[nextIndex]);
  };

  // 번역 헬퍼 함수 (fallback: 영어 → 한국어)
  const t = (texts: MultiLangText): string => {
    return texts[lang] || texts.en || texts.ko;
  };

  const value: LanguageContextType = {
    lang: isHydrated ? lang : "ko",
    setLang,
    cycleLang,
    t,
    langLabel: LANGUAGE_LABELS[isHydrated ? lang : "ko"],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { LANGUAGE_LABELS, LANGUAGE_ORDER };
export default LanguageContext;
