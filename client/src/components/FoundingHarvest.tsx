/**
 * OLIVAEN — Founding Harvest Section
 * Asymmetric editorial layout: product image anchors left,
 * text flows right with generous negative space.
 * Gold hairline dividers as editorial punctuation.
 */
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function FoundingHarvest() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();
  const { ref: bottleRef, isVisible: bottleVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  const { t, lang } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [isReserving, setIsReserving] = useState(false);

  const count = useCountUp(500, 2500, sectionVisible);

  const checkout = trpc.checkout.useMutation();

  const specLabels = ["founding.volume", "founding.pressMethod", "founding.acidity", "founding.polyphenols"];
  const specValues = ["500 ml", lang === "fr" ? "Extraction à Froid" : "Cold Extraction", "≤ 0.3%", "≥ 350 mg/kg"];

  const handleReserve = async () => {
    if (authLoading) return;

    if (!user) {
      toast.info(lang === "fr" ? "Connectez-vous pour réserver" : "Sign in to reserve your bottle");
      startLogin();
      return;
    }

    setIsReserving(true);
    try {
      const result = await checkout.mutateAsync({ quantity: 1 });
      if (result.url) {
        toast.success(lang === "fr" ? "Redirection vers Stripe..." : "Redirecting to secure checkout...");
        window.open(result.url, "_blank");
      }
    } catch (error: any) {
      toast.error(
        error.message || (lang === "fr" ? "Erreur lors de la réservation" : "Reservation error — please try again")
      );
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <section id="founding-harvest" className="bg-cream py-24 lg:py-36">
      <div className="container">
        {/* Asymmetric grid: product image left, text right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Product image — anchored left, generous breathing room */}
          <div
            ref={bottleRef}
            className={`lg:col-span-5 transition-all duration-700 ${
              bottleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="relative max-w-xs">
              <img
                src="/manus-storage/bottle-trio_41c2734a.png"
                alt="OLIVAEN Founding Harvest bottles — green and amber glass with etched logo"
                className="w-full"
              />
              {/* Numbered badge — gold ochre on deep olive */}
              <div className="absolute -top-3 -right-1 bg-deep-olive px-3 py-1.5 shadow-lg">
                <p className="font-mono-label text-gold text-[11px] tracking-[0.15em]">
                  No. 001
                </p>
              </div>
            </div>
          </div>

          {/* Details column — offset, editorial text block */}
          <div
            ref={sectionRef}
            className={`lg:col-span-7 lg:pl-8 transition-all duration-700 delay-100 ${
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {/* Gold hairline as section opener */}
            <div className="w-20 h-px bg-gold mb-6" />
            <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-5">
              {t("founding.label")}
            </p>
            <h2 className="font-serif text-deep-olive text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
              {t("founding.title")}
            </h2>

            {/* Counter — monospaced precision */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono-label text-deep-olive text-5xl lg:text-7xl font-medium leading-none">
                {count}
              </span>
              <span className="font-sans text-sage text-base">
                {t("founding.individually")}
              </span>
            </div>

            {/* Gold hairline separator */}
            <div className="w-12 h-px bg-gold mb-8" />

            <div className="space-y-5 font-sans text-sage text-base lg:text-lg leading-relaxed max-w-lg mb-10">
              <p>{t("founding.p1")}</p>
              <p>{t("founding.p2")}</p>
            </div>

            {/* Specs grid — editorial two-column */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {specLabels.map((key, i) => (
                <div key={key}>
                  <p className="font-mono-label text-gold text-[10px] tracking-[0.15em] uppercase mb-0.5">
                    {t(key)}
                  </p>
                  <p className="font-serif text-deep-olive text-lg">
                    {specValues[i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA strip — feels like an allocation notice, not a generic signup */}
      <div id="reserve" className="mt-20 lg:mt-28">
        <div
          ref={ctaRef}
          className={`container transition-all duration-700 delay-200 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="bg-deep-olive px-8 lg:px-20 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="w-16 h-px bg-gold/60 mb-8" />
              <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-4">
                {t("cta.allocation")}
              </p>
              <h3 className="font-serif text-cream text-3xl lg:text-4xl font-medium mb-4">
                {t("cta.title")}
              </h3>
              <p className="font-sans text-cream/60 text-base leading-relaxed max-w-md mb-10">
                {t("cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleReserve}
                  disabled={isReserving}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gold text-deep-olive text-sm font-semibold tracking-[0.1em] uppercase hover:bg-gold/90 transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isReserving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {lang === "fr" ? "Sécurisation..." : "Securing..."}
                    </>
                  ) : (
                    t("hero.ctaPrimary")
                  )}
                </button>
                <a
                  href="#email-capture"
                  className="inline-flex items-center justify-center px-10 py-4 border border-cream/20 text-cream text-sm font-medium tracking-[0.1em] uppercase hover:bg-cream/5 transition-all duration-200"
                >
                  {t("cta.secondary")}
                </a>
              </div>

              {user && (
                <p className="mt-6 text-cream/40 text-xs font-mono-label">
                  {lang === "fr"
                    ? "Connecté en tant que "
                    : "Signed in as "}
                  {user.name || user.email} ·{" "}
                  <a href="/orders" className="underline hover:text-cream/60">
                    {lang === "fr" ? "Voir mes réservations" : "View my reservations"}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
