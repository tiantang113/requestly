import React from 'react';
import { Select } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useAppLanguage, getAvailableLanguages } from 'hooks/useAppLanguage';
import './LanguageSettings.scss';

/**
 * Language Settings Component
 * Allows users to switch between available languages
 */
export const LanguageSettings: React.FC = () => {
  const { currentLanguage, changeLanguage } = useAppLanguage();
  const { t } = useTranslation();
  const languages = getAvailableLanguages();

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
  };

  const currentLangData = languages.find(l => l.code === currentLanguage);

  return (
    <div className="language-settings-container">
      <div className="settings-header">{t('settings.languageSettings')}</div>
      <p className="text-gray text-sm settings-caption">
        {t('settings.languageSelectorLabel')}
      </p>
      
      <div className="language-selector-wrapper">
        <label htmlFor="language-select" className="language-label">
          {t('settings.languageSelectorLabel')}
        </label>
        <Select
          id="language-select"
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="language-selector"
          dropdownClassName="language-dropdown"
        >
          {languages.map((lang) => (
            <Select.Option key={lang.code} value={lang.code}>
              {lang.nativeName} - {t(`languages.${lang.code === 'en' ? 'english' : 'chinese'}`)}
            </Select.Option>
          ))}
        </Select>
        
        <div className="language-info">
          <p className="text-xs text-gray">
            <Trans 
              i18nKey="settings.languageInfo"
              values={{ language: currentLangData?.nativeName }}
              components={{ strong: <strong /> }}
            />
          </p>
          <p className="text-xs text-gray mt-8">
            {t('settings.languagePersistInfo')}
          </p>
        </div>
      </div>
    </div>
  );
};
