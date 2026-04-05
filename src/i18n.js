import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        hero_title: "Климат под вашим контролем",
        hero_sub:
          "Профессиональный монтаж и обслуживание кондиционеров в Грузии.",
        search_placeholder: "Какую услугу вы ищете?",
        tabs_all: "Все услуги",
        tabs_inst: "Установка",
        tabs_service: "Ремонт и обслуживание",
        tabs_cleaning: "Мойка",
        tabs_contracts: "Договора",
        tabs_portfolio: "Наши работы",
        nav_home: "Главная",
        nav_about: "О компании",
        nav_installation: "Установка",
        nav_service: "Ремонт и обслуживание",
        nav_cleaning: "Мойка",
        nav_contracts: "Договора",
        nav_portfolio: "Наши работы",
      },
    },
    en: {
      translation: {
        hero_title: "Climate under your control",
        hero_sub:
          "Professional installation and maintenance of air conditioners in Georgia.",
        search_placeholder: "Which service are you looking for?",
        tabs_all: "All Services",
        tabs_inst: "Installation",
        tabs_service: "Repair & Maintenance",
        tabs_cleaning: "Cleaning",
        tabs_contracts: "Contracts",
        tabs_portfolio: "Our Works",
        nav_home: "Home",
        nav_about: "About Us",
        nav_installation: "Installation",
        nav_service: "Repair & Maintenance",
        nav_cleaning: "Cleaning",
        nav_contracts: "Contracts",
        nav_portfolio: "Our Works",
      },
    },
    ka: {
      translation: {
        hero_title: "კლიმატი თქვენს კონტროლშია",
        hero_sub:
          "კონდიციონერების პროფესიონალური მონტაჟი და მომსახურება საქართველოში.",
        search_placeholder: "რომელი სერვისი გჭირდებათ?",
        tabs_all: "ყველა სერვისი",
        tabs_inst: "მონტაჟი",
        tabs_service: "რემონტი და მომსახურება",
        tabs_cleaning: "დალაგება/გაწმენდვა",
        tabs_contracts: "კონტრაქტები",
        tabs_portfolio: "ჩვენი სამუშაოები",
        nav_home: "მთავარი",
        nav_about: "ჩვენ შესახებ",
        nav_installation: "მონტაჟი",
        nav_service: "რემონტი და მომსახურება",
        nav_cleaning: "დალაგება/გაწმენდვა",
        nav_contracts: "კონტრაქტები",
        nav_portfolio: "ჩვენი სამუშაოები",
      },
    },
  },
  lng: "ru", // язык по умолчанию
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default i18n;
