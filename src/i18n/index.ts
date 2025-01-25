import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// If you're using browser language detection:
import LanguageDetector from "i18next-browser-languagedetector";

// JSON imports
import en from "./locales/en.json";
import he from "./locales/he.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      he: {
        translation: he,
      },
    },
    // ...
    interpolation: {
      escapeValue: false,
    },
    debug: true, // <-- helpful for seeing which keys are missing
  });

export default i18n;
