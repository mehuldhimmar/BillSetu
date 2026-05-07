/**
 * BillSetu
 */

import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { loadBusinessProfile } from './src/shared/utils/businessProfileStorage';
import {
  DEFAULT_SETTINGS,
  loadSettings,
  hasSelectedLanguage,
  markLanguageSelected,
} from './src/shared/utils/settingsStorage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider, useI18n } from './src/shared/i18n/I18nContext';
import { HomeScreen } from './src/features/dashboard/HomeScreen';
import { GSTCalculatorScreen } from './src/features/gstCalculator/GSTCalculatorScreen';
import { CreateInvoiceScreen, InvoiceData } from './src/features/invoice/CreateInvoiceScreen';
import { InvoicePreviewScreen } from './src/features/invoice/InvoicePreviewScreen';
import { InvoiceHistoryScreen, StoredInvoice } from './src/features/invoice/InvoiceHistoryScreen';
import { BusinessProfileScreen } from './src/features/businessProfile/BusinessProfileScreen';
import { SettingsScreen } from './src/features/settings/SettingsScreen';
import { LanguageSelectionScreen } from './src/features/language/LanguageSelectionScreen';
import { AppAlertHost } from './src/shared/components/AppAlert';
import { NoInternetDialog } from './src/shared/components/NoInternetDialog';
import { AppLanguage } from './src/shared/utils/settingsStorage';

type Screen =
  | 'home'
  | 'gstCalculator'
  | 'createInvoice'
  | 'invoicePreview'
  | 'invoiceHistory'
  | 'businessProfile'
  | 'settings';

/** Where the invoice preview was navigated from */
type PreviewSource = 'createInvoice' | 'invoiceHistory';

// ── Inner app (needs i18n context) ───────────────────────────────────────────

function AppContent() {
  const { setLanguage } = useI18n();

  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData | null>(null);
  const [previewSource, setPreviewSource] = useState<PreviewSource>('createInvoice');
  const [savedInvoices, setSavedInvoices] = useState<StoredInvoice[]>([]);
  // Incrementing this key forces CreateInvoiceScreen to remount (fresh state) after a save
  const [createInvoiceKey, setCreateInvoiceKey] = useState(0);
  const [businessName, setBusinessName] = useState<string>('');
  const [invoicePrefix, setInvoicePrefix] = useState(DEFAULT_SETTINGS.invoicePrefix);

  /**
   * App readiness:
   *  - 'loading'   : checking AsyncStorage
   *  - 'language'  : first launch — show language selection
   *  - 'ready'     : main app flow
   */
  const [appState, setAppState] = useState<'loading' | 'language' | 'ready'>('loading');

  // Load settings + business name + first-launch flag on mount
  useEffect(() => {
    Promise.all([
      loadSettings(),
      loadBusinessProfile(),
      hasSelectedLanguage(),
    ]).then(([settings, profile, languageChosen]) => {
      setInvoicePrefix(settings.invoicePrefix);
      if (profile?.businessName) {
        setBusinessName(profile.businessName);
      }
      setAppState(languageChosen ? 'ready' : 'language');
    });
  }, []);

  // Refresh business name whenever user returns from Business Profile screen
  const handleBusinessProfileBack = useCallback(() => {
    loadBusinessProfile().then(profile => {
      setBusinessName(profile?.businessName ?? '');
    });
    setCurrentScreen('home');
  }, []);

  /** Called when user taps Continue on the language selection screen */
  const handleLanguageChosen = useCallback(async (languageCode: string) => {
    await setLanguage(languageCode as AppLanguage);
    await markLanguageSelected();
    setAppState('ready');
  }, [setLanguage]);

  const show = (screen: Screen) =>
    ({ display: currentScreen === screen ? 'flex' : 'none' } as const);

  /** Called by InvoicePreviewScreen on Save & Close or after Share. */
  const handleSaveInvoice = (invoice: InvoiceData) => {
    const stored: StoredInvoice = {
      ...invoice,
      id: `${invoice.invoiceNumber}-${Date.now()}`,
      savedAt: new Date().toISOString(),
    };
    setSavedInvoices(prev => {
      // Avoid duplicates if user taps Save & Close twice
      const alreadySaved = prev.some(i => i.invoiceNumber === invoice.invoiceNumber);
      return alreadySaved ? prev : [stored, ...prev];
    });
    // Reset the create screen so the next invoice starts fresh
    setCreateInvoiceKey(k => k + 1);
    setCurrentInvoice(null);
    setCurrentScreen('home');
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (appState === 'loading') {
    // Blank screen while AsyncStorage loads — avoids flash
    return null;
  }

  if (appState === 'language') {
    return (
      <LanguageSelectionScreen onContinue={handleLanguageChosen} />
    );
  }

  return (
    <View style={styles.root}>

      <View style={[styles.screen, show('home')]}>
        <HomeScreen
          businessName={businessName}
          invoiceCount={savedInvoices.length}
          totalAmount={savedInvoices.reduce((sum, inv) => sum + (inv.grandTotal ?? 0), 0)}
          onGSTCalculator={() => setCurrentScreen('gstCalculator')}
          onCreateInvoice={() => setCurrentScreen('createInvoice')}
          onHistory={() => setCurrentScreen('invoiceHistory')}
          onBusinessProfile={() => setCurrentScreen('businessProfile')}
          onSettings={() => setCurrentScreen('settings')}
        />
      </View>

      <View style={[styles.screen, show('gstCalculator')]}>
        <GSTCalculatorScreen
          onBack={() => setCurrentScreen('home')}
        />
      </View>

      {/* Key forces a fresh remount after each save, so the next invoice starts clean */}
      <View style={[styles.screen, show('createInvoice')]}>
        <CreateInvoiceScreen
          key={createInvoiceKey}
          existingInvoices={savedInvoices}
          invoicePrefix={invoicePrefix}
          onBack={() => setCurrentScreen('home')}
          onPreview={invoice => {
            setCurrentInvoice(invoice);
            setPreviewSource('createInvoice');
            setCurrentScreen('invoicePreview');
          }}
        />
      </View>

      {currentScreen === 'invoicePreview' && currentInvoice && (
        <View style={styles.screen}>
          <InvoicePreviewScreen
            invoice={currentInvoice}
            mode={previewSource === 'invoiceHistory' ? 'history' : 'create'}
            onBack={() => setCurrentScreen(previewSource)}
            onEdit={() => setCurrentScreen('createInvoice')}
            onSave={handleSaveInvoice}
          />
        </View>
      )}

      {currentScreen === 'invoiceHistory' && (
        <View style={styles.screen}>
          <InvoiceHistoryScreen
            invoices={savedInvoices}
            onBack={() => setCurrentScreen('home')}
            onViewInvoice={invoice => {
              setCurrentInvoice(invoice);
              setPreviewSource('invoiceHistory');
              setCurrentScreen('invoicePreview');
            }}
            onDeleteInvoice={id => {
              setSavedInvoices(prev => prev.filter(inv => inv.id !== id));
            }}
          />
        </View>
      )}

      {currentScreen === 'businessProfile' && (
        <View style={styles.screen}>
          <BusinessProfileScreen
            onBack={handleBusinessProfileBack}
          />
        </View>
      )}

      {currentScreen === 'settings' && (
        <View style={styles.screen}>
          <SettingsScreen
            onBack={() => {
              // Refresh prefix and force CreateInvoiceScreen remount so next invoice uses updated prefix
              loadSettings().then(s => {
                setInvoicePrefix(s.invoicePrefix);
                setCreateInvoiceKey(k => k + 1);
              });
              setCurrentScreen('home');
            }}
          />
        </View>
      )}

    </View>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <AppContent />
        <AppAlertHost />
        <NoInternetDialog />
      </I18nProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  screen: { flex: 1 },
});

export default App;
