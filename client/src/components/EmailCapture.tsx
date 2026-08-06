/**
 * OLIVAEN — Email Capture Section
 * "Join the Founding Harvest" — feels like joining an allocation list,
 * not a newsletter. Asymmetric composition, gold hairline punctuation.
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmailCapture() {
  const { ref, isVisible } = useScrollReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="email-capture" className="bg-cream py-24 lg:py-32">
      <div className="container">
        <div
          ref={ref}
          className={`max-w-xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Gold hairline as editorial opener */}
          <div className="w-20 h-px bg-gold mb-8" />

          <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-4">
            {t("email.label")}
          </p>
          <h2 className="font-serif text-deep-olive text-3xl lg:text-4xl font-medium leading-[1.2] mb-5">
            {t("email.title")}
          </h2>
          <p className="font-sans text-sage text-base lg:text-lg leading-relaxed mb-10 max-w-md">
            {t("email.description")}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email.placeholder")}
                className="flex-1 px-5 py-3.5 bg-white border border-border text-deep-olive font-sans text-base placeholder:text-sage/40 focus:outline-none focus:border-gold transition-colors duration-200"
                required
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-deep-olive text-cream text-xs font-semibold tracking-[0.1em] uppercase hover:bg-deep-olive/90 transition-all duration-200 active:scale-[0.97] whitespace-nowrap"
              >
                {t("email.submit")}
              </button>
            </form>
          ) : (
            <div className="py-4">
              <p className="font-serif text-deep-olive text-lg italic mb-1">
                {t("email.success")}
              </p>
              <p className="font-sans text-sage text-sm">
                {t("email.successSub")}
              </p>
            </div>
          )}

          <p className="font-mono-label text-sage/40 text-[10px] tracking-[0.15em] mt-8">
            {t("email.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}
