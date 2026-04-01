import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAppLanguage } from 'store/selectors';
import { globalActions } from 'store/slices/global/slice';
import i18n from '../i18n';

/**
 * Hook to manage app language settings
 * Provides translation function, current language, and language change functionality
 */
export const useAppLanguage = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(getAppLanguage);
  const { t, i18n: i18nInstance } = useTranslation();

  const changeLanguage = (lng: string) => {
    // Update Redux store
    dispatch(globalActions.updateAppLanguage(lng));
    
    // Update i18next instance
    i18nInstance.changeLanguage(lng);
    
    // Update HTML lang attribute for accessibility and CSS selectors
    document.documentElement.lang = lng;
    
    // Store in localStorage for persistence
    localStorage.setItem('appLanguage', lng);
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    i18n: i18nInstance,
  };
};

/**
 * Hook to get only the translation function
 */
export const useTranslationHook = () => {
  const { t } = useTranslation();
  return t;
};

/**
 * Utility function to get available languages
 */
export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文' },
];

/**
 * Utility function to get language name by code
 */
export const getLanguageName = (code: string): string => {
  const languages = getAvailableLanguages();
  const lang = languages.find(l => l.code === code);
  return lang ? lang.name : code;
};

export default useAppLanguage;
