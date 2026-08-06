/**
 * OLIVAEN — Origin Section
 * Editorial two-column spread: text left, image right.
 * Warm cream background, Deep Olive text.
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Origin() {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="origin" className="bg-cream py-24 lg:py-36">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div
            ref={textRef}
            className={`lg:col-span-6 transition-all duration-700 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="w-20 h-px bg-gold mb-6" />
            <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-6">
              {t("origin.label")}
            </p>
            <h2 className="font-serif text-deep-olive text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.15] mb-8">
              {t("origin.title").split(",")[0]},{" "}
              <span className="italic">{t("origin.title").split(",")[1]?.trim()}</span>
            </h2>

            {/* Gold hairline divider */}
            <div className="w-16 h-px bg-gold/60 mb-8" />

            <div className="space-y-6 font-sans text-sage text-lg leading-relaxed">
              <p>{t("origin.p1")}</p>
              <p>{t("origin.p2")}</p>
              <p>{t("origin.p3")}</p>
            </div>
          </div>

          {/* Image column */}
          <div
            ref={imgRef}
            className={`lg:col-span-6 transition-all duration-700 delay-100 ${
              imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="relative">
              <img
                src="/manus-storage/origin-landscape_c026e38a.jpg"
                alt="Ancient olive trees in the Tunisian Sahel"
                className="w-full h-[400px] lg:h-[560px] object-cover"
              />
              {/* Subtle frame */}
              <div className="absolute inset-0 border border-deep-olive/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
