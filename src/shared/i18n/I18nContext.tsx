/**
 * Lightweight i18n context — no external library required.
 *
 * Usage:
 *   const { t, language, setLanguage } = useI18n();
 *   <Text>{t.settings.title}</Text>
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { en, hi, gu, mr, Translations } from './translations';
import { AppLanguage, loadSettings, saveSettings } from '../utils/settingsStorage';

// ── Translation map ───────────────────────────────────────────────────────────

const TRANSLATIONS: Record<AppLanguage, Translations> = { en, hi, gu, mr };

// ── Context type ──────────────────────────────────────────────────────────────

interface I18nContextValue {
  /** Current language code */
  language: AppLanguage;
  /** Full translation object for the current language */
  t: Translations;
  /**
   * Change the app language and persist it to settings.
   * Triggers a re-render of all consumers.
   */
  setLanguage: (lang: AppLanguage) => Promise<void>;
  /** True while the initial language is being loaded from storage */
  isLoading: boolean;
}

// ── Context ───────────────────────────────────────────────────────────────────

const I18nContext = createContext<I18nContextValue>({
  language: 'en',
  t: en,
  setLanguage: async () => {},
  isLoading: true,
});

// ── Provider ──────────────────────────────────────────────────────────────────

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<AppLanguage>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted language on mount
  useEffect(() => {
    loadSettings().then(settings => {
      setLanguageState(settings.language);
      setIsLoading(false);
    });
  }, []);

  const setLanguage = useCallback(async (lang: AppLanguage) => {
    setLanguageState(lang);
    // Persist — merge with existing settings so other fields are preserved
    const current = await loadSettings();
    await saveSettings({ ...current, language: lang });
  }, []);

  const value: I18nContextValue = {
    language,
    t: TRANSLATIONS[language] ?? en,
    setLanguage,
    isLoading,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
