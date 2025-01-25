import i18n from "./index"; // <-- Make sure you import your i18n config

export async function detectCountryAndSetLanguage() {
  try {
    // Call any GeoIP API you trust
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    if (data.country === "Israel" || data.country_code === "IL") {
      i18n.changeLanguage("he");
    } else {
      i18n.changeLanguage("en");
    }
  } catch (err) {
    // If GeoIP fails, fallback to English
    i18n.changeLanguage("en");
  }
}
