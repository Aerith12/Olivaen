/**
 * OLIVAEN — Hero Section
 * Full-bleed olive grove photography with editorial headline overlay.
 * Deep Olive text on gradient-darkened image for contrast.
 */
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t, lang } = useLanguage();

  // Hero title needs special handling because of the italic span on the second part
  const titleText = lang === "fr" ? t("hero.title") : t("hero.title");
  const titleParts = titleText.split(",");
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(",").trim();

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/manus-storage/tunisia-grove_faf20d42.jpg"
          alt="Chemlali olive groves in the Tunisian Sahel near Sfax"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/85 via-deep-olive/40 to-deep-olive/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container pb-20 lg:pb-28">
        <div className="max-w-2xl">
          {/* Meta label */}
          <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-6">
            {t("hero.location")}
          </p>

          {/* Headline */}
          <h1 className="font-serif text-cream text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] mb-6">
            {titleFirst},{" "}
            <span className="italic text-gold">{titleRest}</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-white/80 text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#reserve"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-deep-olive text-sm font-semibold tracking-[0.1em] uppercase hover:bg-gold/90 transition-all duration-200 active:scale-[0.97]"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a
              href="#origin"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-medium tracking-[0.1em] uppercase hover:bg-white/10 transition-all duration-200"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
