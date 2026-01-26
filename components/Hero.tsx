"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";

// 비디오 목록 - 필요에 따라 추가/수정 가능
const HERO_VIDEOS = [
  "/video/hero-01-exhibition.mp4",
  "/video/hero-02-seamless.mp4",
  "/video/hero-03-brand.mp4",
];

// 비디오 전환 간격 (밀리초) - 각 비디오 재생 후 다음으로 전환
const VIDEO_TRANSITION_DELAY = 500; // 전환 효과 시간 (ms)

const Hero: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  // 다음 비디오로 전환
  const goToNextVideo = useCallback(() => {
    setIsTransitioning(true);

    // 페이드 아웃 후 비디오 변경
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
      setIsTransitioning(false);
    }, VIDEO_TRANSITION_DELAY);
  }, []);

  // 특정 비디오로 이동
  const goToVideo = useCallback(
    (index: number) => {
      if (index === currentVideoIndex) return;

      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentVideoIndex(index);
        setIsTransitioning(false);
      }, VIDEO_TRANSITION_DELAY);
    },
    [currentVideoIndex],
  );

  // 현재 비디오가 끝나면 다음 비디오로 자동 전환
  const handleVideoEnded = useCallback(() => {
    goToNextVideo();
  }, [goToNextVideo]);

  // 비디오 로드 완료 시
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  // 다음 비디오 미리 로드
  useEffect(() => {
    const nextIndex = (currentVideoIndex + 1) % HERO_VIDEOS.length;
    const nextVideoElement = nextVideoRef.current;

    if (nextVideoElement) {
      nextVideoElement.src = HERO_VIDEOS[nextIndex];
      nextVideoElement.load();
    }
  }, [currentVideoIndex]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-brand-black h-screen md:h-[70vh]">
      {/* Background Videos Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* 포스터 이미지 폴백 - 비디오 로딩 전 표시 */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-0" : "opacity-60"
          }`}
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* 현재 재생 중인 비디오 */}
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted
          playsInline
          poster="/images/hero-bg.png"
          onEnded={handleVideoEnded}
          onLoadedData={handleVideoLoaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-60"
          } ${!isVideoLoaded ? "opacity-0" : ""}`}
        >
          <source src={HERO_VIDEOS[currentVideoIndex]} type="video/mp4" />
        </video>

        {/* 다음 비디오 미리 로드 (숨김) */}
        <video
          ref={nextVideoRef}
          muted
          playsInline
          preload="auto"
          className="hidden"
        />

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-brand-black"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Content - CTA Button 중앙 배치 */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center h-full">
        <a
          href="#about"
          className="group relative px-8 py-4 bg-brand-accent text-black font-bold tracking-wider hover:bg-white transition-colors duration-300"
        >
          DISCOVER OUR DNA
          <div className="absolute inset-0 border border-brand-accent translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 pointer-events-none"></div>
        </a>
      </div>

      {/* Tagline - 좌측 하단 작은 사이즈 */}
      <div className="absolute bottom-24 md:bottom-16 left-6 md:left-10 z-10">
        <p className="font-display text-xs md:text-sm text-white/70 font-medium tracking-widest uppercase">
          WE NEVER SAY NO.{" "}
          <span className="italic font-light text-white/50">
            JUST EXECUTION.
          </span>
        </p>
      </div>

      {/* Video Navigation Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
        {HERO_VIDEOS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToVideo(index)}
            className={`group relative w-12 h-1 rounded-full overflow-hidden transition-all duration-300 ${
              index === currentVideoIndex
                ? "bg-brand-accent"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Video ${index + 1}`}
          >
            {/* Progress indicator for current video */}
            {index === currentVideoIndex && (
              <div
                className="absolute inset-0 bg-white origin-left"
                style={{
                  animation: "progressBar linear forwards",
                  animationDuration: videoRef.current?.duration
                    ? `${videoRef.current.duration}s`
                    : "10s",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator - hide on PC (md+), show on mobile */}
      <div className="md:hidden absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-white" size={24} />
      </div>

      {/* Progress bar animation styles */}
      <style jsx>{`
        @keyframes progressBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
