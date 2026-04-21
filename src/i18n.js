import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hero_title: "Climate under your control",
        hero_sub:
          "Professional installation and maintenance of air conditioners and ventilation in Georgia.",
        nav_home: "Home",
        nav_about: "About Us",
        nav_portfolio: "Our Works",
        nav_installation: "Installation",
        nav_service: "Repair",
        nav_cleaning: "Maintenance",
        nav_contracts: "Contracts",
        select_service: "Select System Type:",
        select_lang: "Language:",
        system_ac: "Air Conditioning",
        system_vent: "Ventilation",
      },
    },
    ru: {
      translation: {
        hero_title: "Климат под вашим контролем",
        hero_sub:
          "Профессиональный монтаж и обслуживание кондиционеров и вентиляции в Грузии.",
        nav_home: "Главная",
        nav_about: "О компании",
        nav_portfolio: "Наши работы",
        nav_installation: "Установка",
        nav_service: "Ремонт",
        nav_cleaning: "Обслуживание",
        nav_contracts: "Договора",
        select_service: "Тип системы:",
        select_lang: "Язык:",
        system_ac: "Кондиционирование",
        system_vent: "Вентиляция",
      },
    },
    ka: {
      translation: {
        hero_title: "კლიმატი თქვენს კონტროლშია",
        hero_sub:
          "კონდიციონერების და ვენტილაციის პროფესიონალური მონტაჟი საქართველოში.",
        nav_home: "მთავარი",
        nav_about: "ჩვენ შესახებ",
        nav_portfolio: "ჩვენი სამუშაოები",
        nav_installation: "მონტაჟი",
        nav_service: "რემონტი",
        nav_cleaning: "მომსახურება",
        nav_contracts: "კონტრაქტები",
        select_service: "სისტემის ტიპი:",
        select_lang: "ენა:",
        system_ac: "კონდიცირება",
        system_vent: "ვენტილაცია",
      },
    },
  },
  lng: "ru",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
