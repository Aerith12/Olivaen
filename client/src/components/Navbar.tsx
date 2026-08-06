/**
 * OLIVAEN — Navbar
 * Scroll-aware: transparent over hero with strong wordmark,
 * solid cream on scroll. Brand mark is a signature artifact.
 * Gold hairline bottom rule on scroll for editorial punctuation.
 * Includes FR/EN language toggle.
 */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle, t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Gold hairline rule on scroll — editorial punctuation */}
      {scrolled && (
        <div className="h-px bg-gold/40 w-full" />
      )}

      <nav className="container flex items-center justify-between h-16 lg:h-20">
        {/* Brand wordmark — strong, signature presence */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/manus-storage/brand-logo_82551b4c.png"
            alt="OLIVAEN"
            className="h-7 w-7 lg:h-8 lg:w-8"
          />
          <span
            className={`font-serif font-bold text-xl lg:text-[1.35rem] tracking-[0.18em] uppercase transition-colors duration-300 ${
              scrolled ? "text-deep-olive" : "text-white"
            }`}
          >
            Olivaen
          </span>
        </a>

        {/* Nav links — hidden on mobile, editorial spacing */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#origin"
            className={`text-[13px] font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:opacity-70 ${
              scrolled ? "text-deep-olive" : "text-white/90"
            }`}
          >
            {t("nav.origin")}
          </a>
          <a
            href="#transparency"
            className={`text-[13px] font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:opacity-70 ${
              scrolled ? "text-deep-olive" : "text-white/90"
            }`}
          >
            {t("nav.transparency")}
          </a>
          <a
            href="#founding-harvest"
            className={`text-[13px] font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:opacity-70 ${
              scrolled ? "text-deep-olive" : "text-white/90"
            }`}
          >
            {t("nav.foundingHarvest")}
          </a>
          {user && (
            <Link href="/orders">
              <span
                className={`text-[13px] font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:opacity-70 cursor-pointer ${
                  scrolled ? "text-deep-olive" : "text-white/90"
                }`}
              >
                {lang === "fr" ? "Réservations" : "Reservations"}
              </span>
            </Link>
          )}
        </div>

        {/* Right side: language toggle + CTA */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className={`px-3 py-2 text-[11px] font-mono-label font-medium tracking-[0.08em] transition-all duration-300 cursor-pointer ${
              scrolled
                ? "text-sage hover:text-deep-olive"
                : "text-white/70 hover:text-white"
            }`}
            aria-label="Toggle language"
          >
            <span className={lang === "fr" ? "underline underline-offset-4 decoration-gold" : ""}>
              FR
            </span>
            <span className="mx-1 opacity-40">/</span>
            <span className={lang === "en" ? "underline underline-offset-4 decoration-gold" : ""}>
              EN
            </span>
          </button>

          {/* CTA button */}
          <a
            href="#reserve"
            className={`px-5 py-2.5 text-[11px] font-sans font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
              scrolled
                ? "bg-deep-olive text-cream hover:bg-deep-olive/90"
                : "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur-sm"
            }`}
          >
            {t("nav.reserve")}
          </a>
        </div>
      </nav>
    </header>
  );
}
