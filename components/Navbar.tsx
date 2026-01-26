"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import {
  useLanguage,
  LANGUAGE_ORDER,
  LANGUAGE_LABELS,
  Language,
} from "../contexts/LanguageContext";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "ABOUT", href: "/about" },
    { name: "BUSINESS", href: "/services" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "CONTACT", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const currentLangLabel = lang.toUpperCase();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 shadow-lg shadow-black/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-44 flex items-center">
            {/* Neon glow effect behind logo */}
            <div
              className="absolute inset-0 rounded-lg blur-xl opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(241, 156, 48, 0.4) 0%, rgba(241, 156, 48, 0.1) 50%, transparent 70%)",
              }}
            />
            <Image
              src="/images/bblogo_final.png"
              alt="BB Partners"
              width={180}
              height={48}
              priority
              className="object-contain relative z-10 drop-shadow-[0_0_8px_rgba(241,156,48,0.5)]"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-widest transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-brand-accent"
                  : "text-white hover:text-brand-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-brand-accent/50 transition-all duration-300 group"
              aria-label="Select language"
            >
              <Globe
                size={14}
                className="text-gray-400 group-hover:text-brand-accent"
              />
              <span className="text-xs font-medium tracking-wider text-brand-accent">
                {currentLangLabel}
              </span>
              <ChevronDown
                size={12}
                className={`text-gray-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 py-2 bg-brand-dark/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl min-w-[120px]">
                {LANGUAGE_ORDER.map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      lang === code
                        ? "text-brand-accent bg-white/5"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="font-medium">{code.toUpperCase()}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {LANGUAGE_LABELS[code]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Language + Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="text-sm text-brand-accent font-medium"
          >
            {currentLangLabel}
          </button>

          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Language Dropdown */}
      {isLangOpen && (
        <div className="md:hidden absolute top-full right-4 mt-2 py-2 bg-brand-dark/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl min-w-[120px]">
          {LANGUAGE_ORDER.map((code) => (
            <button
              key={code}
              onClick={() => {
                setLang(code);
                setIsLangOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm ${
                lang === code ? "text-brand-accent" : "text-gray-300"
              }`}
            >
              {code.toUpperCase()} - {LANGUAGE_LABELS[code]}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-black border-b border-white/10 p-6 flex flex-col gap-6 h-screen">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl font-display font-bold ${
                isActive(link.href)
                  ? "text-brand-accent"
                  : "text-white hover:text-brand-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
