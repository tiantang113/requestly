import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getAppMode } from "store/selectors";
import { getUserAuthDetails } from "store/slices/global/user/selectors";
import InstallExtensionCTA from "../../../../components/misc/InstallExtensionCTA";
import { isExtensionInstalled, isSafariExtension } from "actions/ExtensionActions";
import APP_CONSTANTS from "../../../../config/constants";
import { CONSTANTS as GLOBAL_CONSTANTS } from "@requestly/requestly-core";
import { isFeatureCompatible } from "../../../../utils/CompatibilityUtils";
import DataCollection from "./components/DataCollection";
import RulesSyncing from "./components/RulesSyncing";
import { ImplicitRuleTesting } from "./components/ImplicitRuleTesting";
import "./index.scss";
import { BlockList } from "./components/BlockListSettings/BlockListSettings";
import { SafariLimitedSupportView } from "componentsV2/SafariExtension/SafariLimitedSupportView";
import { PopupConfig } from "./components/PopupConfig/PopupConfig";
import { AIConsentSetting } from "./components/AIConsentSetting/AIConsentSetting";
import { LanguageSettings } from "./components/LanguageSettings/LanguageSettings";

export const GlobalSettings = () => {
  const user = useSelector(getUserAuthDetails);
  const appMode = useSelector(getAppMode);
  const { t } = useTranslation();

  const isImplicitTestThisRuleCompatible = useMemo(
    () => isFeatureCompatible(APP_CONSTANTS.FEATURES.IMPLICIT_TEST_THIS_RULE),
    []
  );

  if (appMode !== GLOBAL_CONSTANTS.APP_MODES.DESKTOP) {
    if (!isExtensionInstalled()) {
      return <InstallExtensionCTA heading="Requestly Extension Settings" eventPage="settings_page" />;
    }
    if (isSafariExtension()) {
      return <SafariLimitedSupportView />;
    }
  }

  return (
    <div className="global-settings-container">
      <div className="global-settings-wrapper">
        <div className="settings-header header">{t('settings.globalSettings')}</div>
        <p className="text-gray text-sm settings-caption">
          {t('settings.globalSettingsCaption')}
        </p>
        <div>
          <LanguageSettings />
          <RulesSyncing />
          {user?.loggedIn ? <DataCollection /> : null}
        </div>
        <AIConsentSetting />
        {appMode === GLOBAL_CONSTANTS.APP_MODES.EXTENSION && isImplicitTestThisRuleCompatible ? (
          <ImplicitRuleTesting />
        ) : null}
        {isFeatureCompatible(APP_CONSTANTS.FEATURES.BLOCK_LIST) && <BlockList />}
        {isFeatureCompatible(APP_CONSTANTS.FEATURES.POPUP_CONFIG) && <PopupConfig />}
      </div>
    </div>
  );
};
