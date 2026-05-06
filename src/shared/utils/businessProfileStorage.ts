/**
 * Business Profile — local persistence via AsyncStorage.
 *
 * All data stays on-device; no network calls are made.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@billsetu/business_profile';

// ── Types ────────────────────────────────────────────────────────────────────

export interface BusinessProfile {
  businessName: string;
  gstin: string;
  phone: string;
  address: string;
  logoUri?: string;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Persist the business profile to local storage.
 * Throws if AsyncStorage write fails.
 */
export async function saveBusinessProfile(
  profile: BusinessProfile,
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/**
 * Load the saved business profile.
 * Returns `null` if no profile has been saved yet.
 */
export async function loadBusinessProfile(): Promise<BusinessProfile | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) { return null; }
  try {
    return JSON.parse(raw) as BusinessProfile;
  } catch {
    return null;
  }
}

/**
 * Remove the saved business profile (e.g. on data reset).
 */
export async function clearBusinessProfile(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
