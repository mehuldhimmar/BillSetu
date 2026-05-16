/**
 * BillSetu
 */

import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';
import { BusinessProfile, loadBusinessProfile } from './src/shared/utils/businessProfileStorage';
import {
  DEFAULT_SETTINGS,
  loadSettings,
  hasSelectedLanguage,
  markLanguageSelected,
} from './src/shared/utils/settingsStorage';
import { loadInvoices, saveInvoices } from './src/shared/utils/invoiceStorage';
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
import { AppAlertHost, showAlert } from './src/shared/components/AppAlert';
import { NoInternetDialog } from './src/shared/components/NoInternetDialog';
import { AppLanguage } from './src/shared/utils/settingsStorage';
import { useInterstitialAd } from './src/shared/hooks/useInterstitialAd';

// ── Interstitial Ad Unit IDs ──────────────────────────────────────────────────
// Replace each placeholder with the corresponding ad unit ID from AdMob console.
const AD_UNIT_SAVE_INVOICE    = 'ca-app-pub-xxxxxxxx/aaaaaaaaaa'; // Trigger 1: Save & Close invoice
const AD_UNIT_SHARE_INVOICE   = 'ca-app-pub-xxxxxxxx/bbbbbbbbbb'; // Trigger 2: Share PDF → home
const AD_UNIT_OPEN_GST        = 'ca-app-pub-xxxxxxxx/cccccccccc'; // Trigger 3: Home → GST Calculator
const AD_UNIT_CLOSE_GST       = 'ca-app-pub-xxxxxxxx/dddddddddd'; // Trigger 4: GST Calculator → Home

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

  // ── Interstitial ads — one instance per trigger ──────────────────────────
  const { showAd: showSaveInvoiceAd }  = useInterstitialAd({ adUnitId: AD_UNIT_SAVE_INVOICE });
  const { showAd: showShareInvoiceAd } = useInterstitialAd({ adUnitId: AD_UNIT_SHARE_INVOICE });
  const { showAd: showOpenGSTAd }      = useInterstitialAd({ adUnitId: AD_UNIT_OPEN_GST });
  const { showAd: showCloseGSTAd }     = useInterstitialAd({ adUnitId: AD_UNIT_CLOSE_GST });

  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData | null>(null);
  const [previewSource, setPreviewSource] = useState<PreviewSource>('createInvoice');
  const [savedInvoices, setSavedInvoices] = useState<StoredInvoice[]>([]);
  // Incrementing this key forces CreateInvoiceScreen to remount (fresh state) after a save
  const [createInvoiceKey, setCreateInvoiceKey] = useState(0);
  const [businessName, setBusinessName] = useState<string>('');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [invoicePrefix, setInvoicePrefix] = useState(DEFAULT_SETTINGS.invoicePrefix);

  /**
   * App readiness:
   *  - 'loading'   : checking AsyncStorage
   *  - 'language'  : first launch — show language selection
   *  - 'ready'     : main app flow
   */
  const [appState, setAppState] = useState<'loading' | 'language' | 'ready'>('loading');

  // Load settings + business name + invoices + first-launch flag on mount
  useEffect(() => {
    Promise.all([
      loadSettings(),
      loadBusinessProfile(),
      hasSelectedLanguage(),
      loadInvoices(),
    ]).then(([settings, profile, languageChosen, invoices]) => {
      setInvoicePrefix(settings.invoicePrefix);
      if (profile?.businessName) {
        setBusinessName(profile.businessName);
      }
      setBusinessProfile(profile);
      setSavedInvoices(invoices);
      setAppState(languageChosen ? 'ready' : 'language');
    });
  }, []);

  // Handle Android hardware back button on the home screen — show exit confirmation
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentScreen === 'home') {
        showAlert({
          title: 'Exit App',
          message: 'Are you sure you want to exit BillSetu?',
          buttons: [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
          ],
        });
        return true; // prevent default back behaviour
      }
      return false; // let other screens handle their own back press
    });
    return () => subscription.remove();
  }, [currentScreen]);

  // Refresh business name whenever user returns from Business Profile screen
  const handleBusinessProfileBack = useCallback(() => {
    loadBusinessProfile().then(profile => {
      setBusinessName(profile?.businessName ?? '');
      setBusinessProfile(profile);
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

    let isNewlySaved = false;
    setSavedInvoices(prev => {
      // Avoid duplicates if user taps Save & Close twice
      const alreadySaved = prev.some(i => i.invoiceNumber === invoice.invoiceNumber);
      if (alreadySaved) { return prev; }
      isNewlySaved = true;
      const updated = [stored, ...prev];
      saveInvoices(updated); // persist to AsyncStorage
      return updated;
    });

    // Reset the create screen so the next invoice starts fresh
    setCreateInvoiceKey(k => k + 1);
    setCurrentInvoice(null);

    // Trigger #1 — Save & Close → [Ad] → Home
    // Trigger #2 — Share PDF close → [Ad] → Home
    // Both paths call onSave; we use the save ad for new invoices and
    // the share ad for already-saved ones (share from history mode).
    const adToShow = isNewlySaved ? showSaveInvoiceAd : showShareInvoiceAd;
    adToShow(() => setCurrentScreen('home'));
  };

  /**
   * Trigger #3 — Opening GST Calculator from Home → [Ad] → GSTCalculator
   * Trigger #4 — Closing GST Calculator → [Ad] → Home
   * The shared session cap (max 3 / 2-min cooldown) prevents both from
   * firing back-to-back in the same session window.
   */
  const handleOpenGSTCalculator = useCallback(() => {
    showOpenGSTAd(() => setCurrentScreen('gstCalculator'));
  }, [showOpenGSTAd]);

  const handleCloseGSTCalculator = useCallback(() => {
    showCloseGSTAd(() => setCurrentScreen('home'));
  }, [showCloseGSTAd]);

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
          onGSTCalculator={handleOpenGSTCalculator}
          onCreateInvoice={() => setCurrentScreen('createInvoice')}
          onHistory={() => setCurrentScreen('invoiceHistory')}
          onBusinessProfile={() => setCurrentScreen('businessProfile')}
          onSettings={() => setCurrentScreen('settings')}
        />
      </View>

      <View style={[styles.screen, show('gstCalculator')]}>
        <GSTCalculatorScreen
          isVisible={currentScreen === 'gstCalculator'}
          onBack={handleCloseGSTCalculator}
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
            businessProfile={businessProfile}
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
              setSavedInvoices(prev => {
                const updated = prev.filter(inv => inv.id !== id);
                saveInvoices(updated); // persist deletion to AsyncStorage
                return updated;
              });
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

      <View style={[styles.screen, show('settings')]}>
        <SettingsScreen
          isVisible={currentScreen === 'settings'}
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
