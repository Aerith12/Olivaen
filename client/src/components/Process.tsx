/**
 * OLIVAEN — Process Section
 * "Terroir Documentaire" — editorial asymmetry, not centered layout.
 * Full-bleed harvest image with offset text columns.
 * Gold hairline dividers as editorial punctuation.
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const stepKeys = [
  { label: "process.step1Label", desc: "process.step1" },
  { label: "process.step2Label", desc: "process.step2" },
  { label: "process.step3Label", desc: "process.step3" },
  { label: "process.step4Label", desc: "process.step4" },
];

export default function Process() {
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal();
  const { t } = useLanguage();

  const steps = stepKeys.map((key, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: t(key.label),
    description: t(key.desc),
  }));

  return (
    <section className="bg-warm-sand py-24 lg:py-36">
      <div className="container">
        {/* Full-bleed harvest image */}
        <div
          ref={imgRef}
          className={`transition-all duration-700 mb-20 ${
            imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="relative h-[320px] lg:h-[450px]">
            <img
              src="/manus-storage/olive-harvest_bd47c5b6.jpg"
              alt="Fresh Chemlali olives harvested by hand"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-deep-olive/15" />
          </div>
        </div>

        {/* Asymmetric steps layout — text offset left, not centered */}
        <div className="max-w-3xl">
          <div className="mb-14">
            {/* Gold hairline as editorial punctuation */}
            <div className="w-24 h-px bg-gold mb-6" />
            <p className="font-mono-label text-gold text-xs tracking-[0.2em] uppercase mb-4">
              {t("process.label")}
            </p>
            <h2 className="font-serif text-deep-olive text-3xl sm:text-4xl font-medium leading-[1.15]">
              {t("process.title")}
            </h2>
          </div>

          <div
            ref={stepsRef}
            className="space-y-14 lg:space-y-20"
          >
            {steps.map((step, i) => (
              <div
                key={step.step}
                className={`grid grid-cols-[48px_1fr] lg:grid-cols-[72px_1fr] gap-4 lg:gap-8 transition-all duration-500 ${
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Step number with gold hairline accent */}
                <div className="flex items-start pt-1">
                  <span className="font-mono-label text-gold text-sm lg:text-base font-medium">
                    {step.step}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute ml-[26px] w-px h-full bg-gold/20" style={{ height: 'calc(100% + 2rem)' }} />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-deep-olive text-xl lg:text-2xl font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sage text-base lg:text-lg leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
