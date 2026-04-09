import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hero_title: "Climate under your control",
        hero_sub:
          "Professional installation and maintenance of air conditioners in Georgia.",
        nav_home: "Home",
        nav_about: "About Us",
        nav_portfolio: "Our Works",
        nav_installation: "Installation",
        nav_service: "Repair & Maintenance",
        nav_cleaning: "Cleaning",
        nav_contracts: "Contracts",
        select_service: "Select Service:",
        select_lang: "Language:",
      },
    },
    ru: {
      translation: {
        hero_title: "Климат под вашим контролем",
        hero_sub:
          "Профессиональный монтаж и обслуживание кондиционеров в Грузии.",
        nav_home: "Главная",
        nav_about: "О компании",
        nav_portfolio: "Наши работы",
        nav_installation: "Установка",
        nav_service: "Ремонт и обслуживание",
        nav_cleaning: "Мойка",
        nav_contracts: "Договора",
        select_service: "Выберите услугу:",
        select_lang: "Язык:",
      },
    },
    ka: {
      translation: {
        hero_title: "კლიმატი თქვენს კონტროლშია",
        hero_sub:
          "კონდიციონერების პროფესიონალური მონტაჟი და მომსახურება საქართველოში.",
        nav_home: "მთავარი",
        nav_about: "ჩვენ შესახებ",
        nav_portfolio: "ჩვენი სამუშაოები",
        nav_installation: "მონტაჟი",
        nav_service: "რემონტი და მომსახურება",
        nav_cleaning: "დალაგება/გაწმენდვა",
        nav_contracts: "კონტრაქტები",
        select_service: "აირჩიეთ სერვისი:",
        select_lang: "ენა:",
      },
    },
  },
  lng: "en", // Английский по умолчанию
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
