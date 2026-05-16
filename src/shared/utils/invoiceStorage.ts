/**
 * Invoice History — local persistence via AsyncStorage.
 *
 * All data stays on-device; no network calls are made.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredInvoice } from '../../features/invoice/InvoiceHistoryScreen';

const STORAGE_KEY = '@billsetu/invoices';

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Persist the full invoice list to local storage.
 * Throws if AsyncStorage write fails.
 */
export async function saveInvoices(invoices: StoredInvoice[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

/**
 * Load the saved invoice list.
 * Returns an empty array if no invoices have been saved yet.
 */
export async function loadInvoices(): Promise<StoredInvoice[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) { return []; }
  try {
    return JSON.parse(raw) as StoredInvoice[];
  } catch {
    return [];
  }
}

/**
 * Remove all saved invoices (e.g. on data reset).
 */
export async function clearInvoices(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
