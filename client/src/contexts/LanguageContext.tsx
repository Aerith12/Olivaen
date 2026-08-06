/**
 * OLIVAEN — Language Context
 * French / English toggle with full translated copy.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "en" | "fr";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.origin": { en: "Origin", fr: "Origine" },
  "nav.transparency": { en: "Transparency", fr: "Transparence" },
  "nav.foundingHarvest": { en: "Founding Harvest", fr: "Récolte Fondateur" },
  "nav.reserve": { en: "Reserve", fr: "Réserver" },

  // Hero
  "hero.location": { en: "Sfax, Tunisia — Harvest 2026", fr: "Sfax, Tunisie — Récolte 2026" },
  "hero.title": { en: "From Our Grove, Unchanged Since 1953", fr: "De Notre Verger, Inchangé Depuis 1953" },
  "hero.subtitle": {
    en: "Single-varietal Chemlali olives, first press, cold-extracted. Third-generation hands. Every bottle numbered.",
    fr: "Olives Chemlali monocépage, première pression, extraction à froid. Mains de troisième génération. Chaque bouteille numérotée.",
  },
  "hero.ctaPrimary": { en: "Reserve Your Bottle", fr: "Réservez Votre Bouteille" },
  "hero.ctaSecondary": { en: "Our Story", fr: "Notre Histoire" },

  // Origin
  "origin.label": { en: "The Origin", fr: "L'Origine" },
  "origin.title": { en: "Three Generations, One Grove", fr: "Trois Générations, Un Seul Verger" },
  "origin.p1": {
    en: "The groves of Sfax have been in our family since 1953. My grandfather planted the first Chemlali trees in the mineral-rich soil of the Sahel, a coastal plain known for producing the world's finest single-varietal olive oil.",
    fr: "Les vergers de Sfax appartiennent à notre famille depuis 1953. Mon grand-père a planté les premiers oliviers Chemlali dans le sol minéral du Sahel, une plaine côtière reconnue pour produire la meilleure huile d'olive monocépage au monde.",
  },
  "origin.p2": {
    en: "The Chemlali cultivar — resilient, low-yield, drought-tolerant — has survived here for generations. It is not the most fashionable olive in the world, but it is ours. And what it produces, when pressed within hours of harvest, is an oil of extraordinary depth: herbaceous, complex, alive.",
    fr: "La variété Chemlali — résiliente, à faible rendement, résistante à la sécheresse — a survécu ici pendant des générations. Ce n'est pas l'olive la plus à la mode, mais c'est la nôtre. Et ce qu'elle produit, pressée dans les heures qui suivent la récolte, est une huile d'une profondeur extraordinaire : herbacée, complexe, vivante.",
  },
  "origin.p3": {
    en: "We don't blend. We don't add. We harvest at night, press cold, and bottle without filtration. Every bottle carries the date it was pressed, the mill that made it, and the results of our third-party lab analysis. Transparency isn't a marketing strategy — it's a family tradition.",
    fr: "Nous ne mélangeons pas. Nous n'ajoutons rien. Nous récoltons de nuit, pressons à froid, et mettons en bouteille sans filtration. Chaque bouteille porte la date de pression, le moulin qui l'a faite, et les résultats de notre analyse en laboratoire indépendant. La transparence n'est pas une stratégie marketing — c'est une tradition familiale.",
  },

  // Process
  "process.label": { en: "The Process", fr: "Le Processus" },
  "process.title": { en: "Four Hands, One Oil", fr: "Quatre Mains, Une Seule Huile" },
  "process.step1Label": { en: "Hand-Picked", fr: "Cueillies à la Main" },
  "process.step1": {
    en: "Every olive is harvested by hand from our Chemlali trees in the groves of Sfax. We harvest at night to minimize oxidative stress.",
    fr: "Chaque olive est récoltée à la main dans nos oliviers Chemlali des vergers de Sfax. Nous récoltons de nuit pour minimiser le stress oxydatif.",
  },
  "process.step2Label": { en: "Cold-Pressed Within Hours", fr: "Pressée à Froid en Quelques Heures" },
  "process.step2": {
    en: "Olives arrive at the mill within six hours of being harvested. Pressed at ≤ 27°C to preserve polyphenols, aromas, and the living character of the oil.",
    fr: "Les olives arrivent au moulin dans les six heures suivant la récolte. Pressées à ≤ 27°C pour préserver les polyphénols, les arômes et le caractère vivant de l'huile.",
  },
  "process.step3Label": { en: "Lab Certified", fr: "Certifiée en Laboratoire" },
  "process.step3": {
    en: "Each batch is tested by an independent lab for acidity, polyphenol content, oxidation, and sensory profile. Results are shared with every bottle.",
    fr: "Chaque lot est analysé par un laboratoire indépendant pour l'acidité, la teneur en polyphénols, l'oxydation et le profil sensoriel. Les résultats accompagnent chaque bouteille.",
  },
  "process.step4Label": { en: "Numbered & Sealed", fr: "Numérotée et Scellée" },
  "process.step4": {
    en: "Bottles are manually filled, sealed with wax, and assigned a unique number. Each bottle is individually numbered and certified — a silent witness of a single harvest.",
    fr: "Les bouteilles sont remplies à la main, scellées à la cire, et portent un numéro unique. Chaque bouteille est numérotée individuellement et certifiée — témoin silencieux d'une seule récolte.",
  },

  // Transparency
  "transparency.label": { en: "Radical Transparency", fr: "Transparence Radicale" },
  "transparency.title": {
    en: "Know Exactly What You're Getting",
    fr: "Sachez Exactement Ce Que Vous Recevez",
  },
  "transparency.p": {
    en: "Every bottle's lab report is public. Free fatty acids, polyphenol count, oxidation status, origin coordinates, press date, and mill name. We publish the numbers because the oil speaks for itself.",
    fr: "Le rapport d'analyse de chaque bouteille est public. Acides gras libres, taux de polyphénols, état d'oxydation, coordonnées d'origine, date de pression et nom du moulin. Nous publions les chiffres parce que l'huile parle d'elle-même.",
  },
  "transparency.viewLab": { en: "View Lab Report", fr: "Voir le Rapport" },

  // Founding Harvest
  "founding.label": { en: "The Founding Harvest", fr: "La Récolte Fondateur" },
  "founding.title": { en: "500 Bottles. One Press.", fr: "500 Bouteilles. Une Seule Pression." },
  "founding.individually": { en: "individually numbered", fr: "numérotées individuellement" },
  "founding.p1": {
    en: "The October 2026 harvest is our first. Hand-picked from our ancestral grove, cold-pressed within six hours, and bottled without filtration to preserve the full spectrum of flavor and health compounds.",
    fr: "La récolte d'octobre 2026 est la première. Cueillies à la main dans notre verger ancestral, pressées à froid en moins de six heures, et mises en bouteille sans filtration pour préserver la pleine palette aromatique et les bienfaits santé.",
  },
  "founding.p2": {
    en: "Each bottle carries its own number — from 001 to 500 — and a certificate of authenticity signed by our family. Once they're gone, they're gone. The next harvest may come, but this one will not.",
    fr: "Chaque bouteille porte son propre numéro — de 001 à 500 — et un certificat d'authenticité signé par notre famille. Une fois parties, elles sont parties. La prochaine récolte viendra peut-être, mais celle-ci ne reviendra pas.",
  },
  "founding.volume": { en: "Volume", fr: "Volume" },
  "founding.pressMethod": { en: "Press Method", fr: "Méthode de Pression" },
  "founding.acidity": { en: "Acidity", fr: "Acidité" },
  "founding.polyphenols": { en: "Polyphenols", fr: "Polyphénols" },

  // CTA strip
  "cta.allocation": { en: "Founding Harvest Allocation", fr: "Allocation Récolte Fondateur" },
  "cta.title": { en: "Reserve Your Bottle", fr: "Réservez Votre Bouteille" },
  "cta.description": {
    en: "The October 2026 press ships directly from our mill in Sfax. Reserve now to secure your numbered bottle before the 500 are allocated.",
    fr: "La pression d'octobre 2026 expédie directement depuis notre moulin à Sfax. Réservez maintenant pour sécuriser votre bouteille numérotée avant que les 500 soient toutes allouées.",
  },
  "cta.secondary": { en: "Join the Founding Harvest", fr: "Rejoindre la Récolte Fondateur" },

  // Email capture
  "email.label": { en: "The Harvest List", fr: "La Liste de Récolte" },
  "email.title": { en: "Join the Founding Harvest", fr: "Rejoindre la Récolte Fondateur" },
  "email.description": {
    en: "Be the first to know when Founding Harvest reservations open. No marketing. Just the harvest date, the numbers, and the oil.",
    fr: "Soyez le premier à savoir quand les réservations de la Récolte Fondateur s'ouvriront. Pas de marketing. Juste la date de récolte, les chiffres, et l'huile.",
  },
  "email.placeholder": { en: "Your email", fr: "Votre email" },
  "email.submit": { en: "Join the List", fr: "Rejoindre la Liste" },
  "email.success": { en: "Welcome to the harvest.", fr: "Bienvenue dans la récolte." },
  "email.successSub": {
    en: "We'll be in touch when the Founding Harvest opens.",
    fr: "Nous vous contacterons quand la Récolte Fondateur s'ouvrira.",
  },
  "email.disclaimer": { en: "Direct-to-consumer · Shipped within the EU", fr: "Direct-to-consumer · Expédition en UE" },

  // Footer
  "footer.sfax": { en: "Single-origin Chemlali · Sfax, Tunisia", fr: "Monocépage Chemlali · Sfax, Tunisie" },
  "footer.brand": { en: "OLIVAEN", fr: "OLIVAEN" },
  "footer.rights": { en: "All rights reserved.", fr: "Tous droits réservés." },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry["en"] || key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
