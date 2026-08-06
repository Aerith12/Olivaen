/**
 * OLIVAEN — Footer
 * Minimal, editorial. Brand mark, origin, and quiet details.
 */
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-deep-olive py-16 lg:py-20">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/manus-storage/brand-logo_82551b4c.png"
                alt="OLIVAEN"
                className="h-7 w-7"
              />
              <span className="font-serif text-cream text-lg tracking-[0.15em] font-bold">
                OLIVAEN
              </span>
            </div>
            <p className="font-sans text-cream/50 text-sm leading-relaxed">
              {t("footer.sfax")}
              <br />
              {lang === "fr" ? "Depuis 2026." : "Est. 2026."}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <a href="#origin" className="font-sans text-cream/60 text-sm hover:text-cream transition-colors duration-200">
              {t("nav.origin")}
            </a>
            <a href="#transparency" className="font-sans text-cream/60 text-sm hover:text-cream transition-colors duration-200">
              {t("nav.transparency")}
            </a>
            <a href="#founding-harvest" className="font-sans text-cream/60 text-sm hover:text-cream transition-colors duration-200">
              {t("nav.foundingHarvest")}
            </a>
            <a href="#email-capture" className="font-sans text-cream/60 text-sm hover:text-cream transition-colors duration-200">
              {t("cta.secondary")}
            </a>
          </div>

          {/* Details */}
          <div className="lg:text-right">
            <p className="font-mono-label text-gold text-[10px] tracking-[0.15em] uppercase mb-3">
              {lang === "fr" ? "Direct Consommateur" : "Direct-to-Consumer"}
            </p>
            <p className="font-sans text-cream/50 text-sm leading-relaxed">
              {lang === "fr" ? "Expédition en UE." : "Shipped within the EU."}
              <br />
              {lang === "fr" ? "Livraison chaîne du froid." : "Cold-chain delivery."}
              <br />
              {lang === "fr" ? "Certifié laboratoire indépendant." : "Third-party lab certified."}
            </p>
          </div>
        </div>

        {/* Gold hairline rule */}
        <div className="w-full h-px bg-gold/20 mt-12 lg:mt-16 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-cream/30 text-xs">
            © 2026 OLIVAEN. {t("footer.rights")}
          </p>
          <p className="font-mono-label text-cream/20 text-[10px] tracking-[0.15em]">
            {lang === "fr" ? "Verger. Moulin. Bouteille. Preuve." : "Grove. Mill. Bottle. Proof."}
          </p>
        </div>
      </div>
    </footer>
  );
}
