import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bbpartners.co.kr"),
  title: {
    default: "bbpartners | Just Execution",
    template: "%s | bbpartners",
  },
  description: "더블비 파트너스(bbpartners)는 Blood Brother의 마인드로 럭셔리 브랜드 경험을 완성하는 실행 중심의 파트너입니다. 15년 이상의 프리미엄 브랜드 이벤트 기획 및 운영 노하우를 보유하고 있습니다.",
  keywords: [
    "이벤트 대행사",
    "BTL 대행사",
    "행사 기획사",
    "기업 행사 대행",
    "수입차 행사",
    "신차 발표회",
    "VIP 의전",
    "팝업스토어 기획",
    "럭셔리 브랜드 마케팅",
    "브랜드 프로모션",
    "전시 기획",
    "Event Agency Korea",
    "BTL Marketing",
    "Automotive Events",
    "Luxury Brand Experience"
  ],
  authors: [{ name: "bbpartners" }],
  creator: "bbpartners",
  publisher: "bbpartners",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "bbpartners | Just Execution",
    description: "Execution Without Excuses. 럭셔리 브랜드 경험의 새로운 기준, 더블비 파트너스입니다.",
    url: "https://bbpartners.co.kr",
    siteName: "bbpartners",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "bbpartners Dark Luxury Aesthetic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bbpartners | Just Execution",
    description: "We never say no. Just Execution. 럭셔리 브랜드 실행 파트너.",
    images: ["https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${oswald.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
