# bbpartners

Premium BTL & Event Execution Partner 웹사이트 - Next.js 16 기반

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🛠 Tech Stack

| Category  | Technology                      |
| --------- | ------------------------------- |
| Framework | Next.js 16 (App Router)         |
| Language  | TypeScript                      |
| Styling   | Tailwind CSS                    |
| AI        | Google Gemini (`@google/genai`) |

## ✨ Features

### 🌍 다국어 지원 (i18n)

- **4개 언어 지원**: 한국어, English, Deutsch, 中文
- 헤더 언어 선택기 (드롭다운)
- localStorage 기반 언어 선호도 저장
- React Context 기반 전역 상태 관리

### 🔍 SEO 최적화

- 자동 생성 `sitemap.xml` 및 `robots.txt`
- JSON-LD 구조화 데이터 (Organization, LocalBusiness)
- 페이지별 메타데이터 (keywords, canonical URL, OpenGraph)
- 커스텀 OG 이미지

### 🎬 Hero Section

- 멀티 비디오 롤링 (자동 전환)
- 비디오 로딩 전 포스터 이미지 폴백
- 반응형 높이 (PC: 70vh, Mobile: 100vh)

### 📱 반응형 아키텍처

- PC: MPA (Multi-Page Application)
- Mobile: SPA (Single-Page Application)
- CSS 미디어 쿼리 기반 레이아웃 전환
- Server Component 우선 렌더링

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root Layout + LanguageProvider
│   ├── page.tsx            # Home (Server Component)
│   ├── about/              # About Page
│   ├── services/           # Services Page
│   ├── portfolio/          # Portfolio Page
│   ├── contact/            # Contact Page
│   ├── sitemap.ts          # Dynamic Sitemap
│   └── robots.ts           # Dynamic Robots.txt
├── components/
│   ├── Hero.tsx            # Video Carousel Hero
│   ├── Navbar.tsx          # Navigation + Language Selector
│   ├── About.tsx           # WHO WE ARE, VISION, MISSION
│   ├── Services.tsx        # 4 Service Cards
│   ├── Contact.tsx         # Footer Contact
│   └── JsonLd.tsx          # Structured Data
├── contexts/
│   └── LanguageContext.tsx # i18n Context Provider
└── public/
    ├── images/             # Static Images
    └── video/              # Hero Videos
```

## 📝 Changelog

### 2026-01-17

- ✅ SEO 최적화: sitemap.ts, robots.ts, JSON-LD 구조화 데이터 추가
- ✅ 페이지별 메타데이터 강화 (keywords, canonical, OpenGraph)
- ✅ Hydration 에러 수정: Server Component + CSS 반응형 전환
- ✅ 커스텀 OG 이미지 생성 및 적용
- ✅ Hero 비디오 포스터 폴백 추가
- ✅ 다국어 (i18n) 기능 구현: 4개 언어 지원 (KO/EN/DE/ZH)
- ✅ About, Services, Contact 전체 다국어 리팩터링

## 📄 License

© 2025 BB PARTNERS. All Rights Reserved.
