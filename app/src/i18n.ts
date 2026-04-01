import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';

const resources = {
  en: {
    translation: enUS,
  },
  zh: {
    translation: zhCN,
  },
};

// Get saved language from localStorage or default to 'en'
const savedLanguage = typeof window !== 'undefined' 
  ? localStorage.getItem('appLanguage') || 'en' 
  : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Update HTML lang attribute on initialization
if (typeof document !== 'undefined') {
  document.documentElement.lang = savedLanguage;
}

export default i18n;
