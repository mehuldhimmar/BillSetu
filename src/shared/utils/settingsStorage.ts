/**
 * Settings — local persistence via AsyncStorage.
 *
 * All data stays on-device; no network calls are made.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@billsetu/settings';
const LANGUAGE_SELECTED_KEY = '@billsetu/languageSelected';

// ── Types ────────────────────────────────────────────────────────────────────

export type AppTheme = 'light' | 'dark';
export type AppLanguage = 'en' | 'hi' | 'gu' | 'mr';

export interface AppSettings {
  language: AppLanguage;
  currency: string;       // e.g. '₹ INR'
  invoicePrefix: string;  // e.g. 'INV-'
  theme: AppTheme;
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  currency: '₹ INR',
  invoicePrefix: 'INV-',
  theme: 'light',
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Persist settings to local storage.
 * Throws if AsyncStorage write fails.
 */
export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Load saved settings.
 * Returns DEFAULT_SETTINGS if nothing has been saved yet,
 * and persists the defaults so future reads are consistent.
 */
export async function loadSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    // First launch — persist defaults so invoicePrefix etc. are stored
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return { ...DEFAULT_SETTINGS };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    // Merge with defaults so new keys added in future versions are handled
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Reset settings to factory defaults.
 */
export async function clearSettings(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

// ── First-launch language selection ──────────────────────────────────────────

/**
 * Returns true if the user has already completed the language selection screen.
 */
export async function hasSelectedLanguage(): Promise<boolean> {
  const value = await AsyncStorage.getItem(LANGUAGE_SELECTED_KEY);
  return value === 'true';
}

/**
 * Mark that the user has completed the language selection screen.
 */
export async function markLanguageSelected(): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_SELECTED_KEY, 'true');
}
