import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const en = require("./languages/en.json");
const kh = require("./languages/kh.json");

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: en,
    km: kh,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
