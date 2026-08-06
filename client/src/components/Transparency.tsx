/**
 * OLIVAEN — Transparency Section
 * Displays the radical transparency promise: harvest date, mill, lab results,
 * polyphenol content. Dark olive background with cream text for impact.
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Calendar, Beaker, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Transparency() {
  const { ref, isVisible } = useScrollReveal();
  const { t, lang } = useLanguage();

  const metricLabels = lang === "fr"
    ? ["Date de Récolte", "Moulin", "Variété", "Polyphénols"]
    : ["Harvest Date", "Mill", "Variety", "Polyphenols"];

  const metricValues = ["15 Oct 2026", "Moulin El Hana", "Chemlali", "≥ 350 mg/kg"];

  const metricNotes = lang === "fr"
    ? [
        "Cueillies à la main, le même jour",
        "Sfax, Tunisie — 8 km du verger",
        "Monocépage, origine unique",
        "Certifié par laboratoire indépendant",
      ]
    : [
        "Hand-picked, same day",
        "Sfax, Tunisia — 8km from grove",
        "Single-origin, single-varietal",
        "Third-party lab certified",
      ];

  const icons = [Calendar, MapPin, Leaf, Beaker];

  const labNote = lang === "fr"
    ? "Analyse par l'Institut de l'Olivier de Sfax. Certificat inclus avec chaque bouteille."
    : "Lab analysis by Institut de l'Olivier de Sfax. Certificate included with every bottle.";

  return (
    <section id="transparency" className="bg-deep-olive py-24 lg:py-36">
      <div className="container">
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="w-20 h-px bg-gold/60 mb-6" />
          <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-6">
            {t("transparency.label")}
          </p>
          <h2 className="font-serif text-cream text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
            {t("transparency.title")}
          </h2>
          <p className="font-sans text-cream/70 text-lg leading-relaxed">
            {t("transparency.p")}
          </p>
        </div>

        {/* Metrics grid */}
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {icons.map((Icon, i) => (
            <div
              key={metricLabels[i]}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Icon className="w-5 h-5 text-gold mb-4" />
              <p className="font-mono-label text-gold text-[10px] tracking-[0.15em] uppercase mb-2">
                {metricLabels[i]}
              </p>
              <p className="font-serif text-cream text-xl lg:text-2xl font-medium mb-1">
                {metricValues[i]}
              </p>
              <p className="font-sans text-cream/50 text-sm">
                {metricNotes[i]}
              </p>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="w-full h-px bg-gold/30 mt-20 mb-12" />

        {/* Bottom statement */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <p className="font-sans text-cream/60 text-sm max-w-md">
            {labNote}
          </p>
          <a
            href="#reserve"
            className="inline-flex items-center px-6 py-3 bg-gold text-deep-olive text-xs font-semibold tracking-[0.1em] uppercase hover:bg-gold/90 transition-all duration-200 active:scale-[0.97]"
          >
            {t("transparency.viewLab")}
          </a>
        </div>
      </div>
    </section>
  );
}
