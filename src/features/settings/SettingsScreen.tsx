import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  BackHandler,
  Image,
  ImageSourcePropType,
  Keyboard,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { showAlert } from '../../shared/components/AppAlert';
import {
  AppLanguage,
  AppSettings,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
} from '../../shared/utils/settingsStorage';
import { SUPPORTED_LANGUAGES } from '../../shared/constants/languages';
import { useI18n } from '../../shared/i18n/I18nContext';
import { styles } from './SettingsScreen.styles';

// ── Constants ────────────────────────────────────────────────────────────────

type ModalType = 'language' | 'prefix' | null;

// ── Sub-components ────────────────────────────────────────────────────────────

/** Animated toggle switch */
function Toggle({
  value,
  onToggle,
  accessibilityLabel,
}: {
  value: boolean;
  onToggle: () => void;
  accessibilityLabel: string;
}) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value }}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.toggleTrack,
          value ? styles.toggleTrackOn : styles.toggleTrackOff,
        ]}
      >
        <Animated.View
          style={[
            styles.toggleThumb,
            { transform: [{ translateX }] },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

/** A single tappable settings row */
interface SettingsRowProps {
  image: ImageSourcePropType;
  iconBg: string;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  isDanger?: boolean;
  showDivider?: boolean;
}

function SettingsRow({
  image,
  iconBg,
  label,
  value,
  onPress,
  rightElement,
  showChevron = true,
  isDanger = false,
  showDivider = true,
}: SettingsRowProps) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.row,
          pressed && onPress && styles.rowPressed,
        ]}
        onPress={onPress}
        accessibilityRole={onPress ? 'button' : 'none'}
        accessibilityLabel={label}
        accessibilityHint={value ? `Current value: ${value}` : undefined}
      >
        {/* Icon */}
        <View style={[styles.rowIconWrap, { backgroundColor: iconBg }]}>
          <Image source={image} style={styles.rowIcon} resizeMode="contain" accessibilityElementsHidden />
        </View>

        {/* Label + value */}
        <View style={styles.rowContent}>
          <Text style={isDanger ? styles.rowLabelDanger : styles.rowLabel}>
            {label}
          </Text>
          {value !== undefined && (
            <Text style={styles.rowValue} numberOfLines={1}>{value}</Text>
          )}
        </View>

        {/* Right side */}
        <View style={styles.rowRight}>
          {rightElement ?? null}
          {showChevron && onPress && (
            <Image source={require('../../images/down.png')} style={styles.rowChevron} resizeMode="contain" accessibilityElementsHidden />
          )}
        </View>
      </Pressable>
      {showDivider && <View style={styles.rowDivider} />}
    </>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

interface SettingsScreenProps {
  onBack?: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const insets = useSafeAreaInsets();
  const { t, setLanguage } = useI18n();

  // ── Settings state ───────────────────────────────────────
  const [settings, setSettings] = useState<AppSettings>({ ...DEFAULT_SETTINGS });
  const [isLoading, setIsLoading] = useState(true);

  // ── Modal state ──────────────────────────────────────────
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // ── Prefix input state ───────────────────────────────────
  const [prefixDraft, setPrefixDraft] = useState('');
  const [prefixFocused, setPrefixFocused] = useState(false);

  // ── Load on mount ────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const saved = await loadSettings();
      setSettings(saved);
      setPrefixDraft(saved.invoicePrefix);
      setIsLoading(false);
    })();
  }, []);

  // ── Android back ─────────────────────────────────────────
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (activeModal) {
        setActiveModal(null);
        return true;
      }
      onBack?.();
      return true;
    });
    return () => sub.remove();
  }, [activeModal, onBack]);

  // ── Persist helper ───────────────────────────────────────
  const persist = useCallback(async (patch: Partial<AppSettings>) => {
    const updated = { ...settings, ...patch };
    setSettings(updated);
    try {
      await saveSettings(updated);
    } catch {
      showAlert({ title: t.alerts.errorTitle, message: t.settings.errorSave });
    }
  }, [settings, t]);

  // ── Handlers ─────────────────────────────────────────────
  const handleLanguageSelect = useCallback(async (code: string) => {
    const lang = code as AppLanguage;
    // Update i18n context (also persists to storage)
    await setLanguage(lang);
    // Keep local settings state in sync
    setSettings(prev => ({ ...prev, language: lang }));
    setActiveModal(null);
  }, [setLanguage]);

  const handleThemeToggle = useCallback(() => {
    persist({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  }, [persist, settings.theme]);

  const handlePrefixOpen = useCallback(() => {
    setPrefixDraft(settings.invoicePrefix);
    setActiveModal('prefix');
  }, [settings.invoicePrefix]);

  const handlePrefixApply = useCallback(() => {
    const trimmed = prefixDraft.trim();
    if (!trimmed) {
      showAlert({ title: t.settings.invalidPrefix, message: t.settings.invalidPrefixMessage });
      return;
    }
    persist({ invoicePrefix: trimmed });
    Keyboard.dismiss();
    setActiveModal(null);
  }, [prefixDraft, persist, t]);

  const handlePrivacyPolicy = useCallback(() => {
    Linking.openURL('https://mehuldhimmar.github.io/BillSetu/PrivacyPolicy.html').catch(() =>
      showAlert({ title: t.alerts.errorTitle, message: t.settings.errorLink }),
    );
  }, [t]);

  const handleTerms = useCallback(() => {
    Linking.openURL('https://mehuldhimmar.github.io/BillSetu/Terms.html').catch(() =>
      showAlert({ title: t.alerts.errorTitle, message: t.settings.errorLink }),
    );
  }, [t]);

  const handleRateUs = useCallback(() => {
    // Deep-link to Play Store / App Store listing
    const url = Platform.OS === 'android'
      ? 'market://details?id=com.billsetu'
      : 'itms-apps://itunes.apple.com/app/idXXXXXXXXX?action=write-review';
    Linking.openURL(url).catch(() =>
      Linking.openURL('https://billsetu.app').catch(() => {}),
    );
  }, []);

  const handleShareApp = useCallback(async () => {
    try {
      await Share.share({
        message: t.settings.shareMessage,
        title: t.settings.shareTitle,
      });
    } catch {
      // user cancelled — no-op
    }
  }, [t]);

  // ── Language display label ───────────────────────────────
  const languageLabel =
    SUPPORTED_LANGUAGES.find(l => l.code === settings.language)?.nativeLabel ?? 'English';

  if (isLoading) { return null; }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

      {/* ── Header ── */}
      <View style={styles.headerBar}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={t.common.back}
          hitSlop={8}
        >
          <Image source={require('../../images/back.png')} style={styles.backIcon} resizeMode="contain" accessibilityElementsHidden />
        </Pressable>
        <Text style={styles.headerTitle}>{t.settings.title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 32 },
          ]}
          showsVerticalScrollIndicator={false}
        >

          {/* ── Preferences ── */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{t.settings.preferences}</Text>
            <View style={styles.card}>
              <SettingsRow
                image={require('../../images/language.png')}
                iconBg={Colors.selected.background}
                label={t.settings.language}
                value={languageLabel}
                onPress={() => setActiveModal('language')}
              />
              <SettingsRow
                image={require('../../images/invoice.png')}
                iconBg={Colors.selected.background}
                label={t.settings.invoicePrefix}
                value={settings.invoicePrefix}
                onPress={handlePrefixOpen}
                showDivider={false}
              />
            </View>
          </View>

          {/* ── About ── */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{t.settings.about}</Text>
            <View style={styles.card}>
              <SettingsRow
                image={require('../../images/privacy.png')}
                iconBg={Colors.selected.background}
                label={t.settings.privacyPolicy}
                onPress={handlePrivacyPolicy}
              />
              <SettingsRow
                image={require('../../images/terms.png')}
                iconBg={Colors.selected.background}
                label={t.settings.termsConditions}
                onPress={handleTerms}
              />
              <SettingsRow
                image={require('../../images/star.png')}
                iconBg={Colors.selected.background}
                label={t.settings.rateUs}
                onPress={handleRateUs}
              />
              <SettingsRow
                image={require('../../images/share.png')}
                iconBg={Colors.selected.background}
                label={t.settings.shareApp}
                onPress={handleShareApp}
                showDivider={false}
              />
            </View>
          </View>

          {/* ── App version ── */}
          <View style={styles.versionRow}>
            <Text style={styles.versionText}>{t.settings.version}</Text>
          </View>

        </ScrollView>
      </View>

      {/* ── Language Modal ── */}
      <Modal
        visible={activeModal === 'language'}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
        statusBarTranslucent
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setActiveModal(null)}
          accessibilityRole="button"
          accessibilityLabel={t.common.close}
        >
          <Pressable
            style={[styles.modalSheet, { paddingBottom: insets.bottom + 16 }]}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{t.settings.selectLanguage}</Text>

            {SUPPORTED_LANGUAGES.map((lang, idx) => {
              const isSelected = settings.language === lang.code;
              const isLast = idx === SUPPORTED_LANGUAGES.length - 1;
              return (
                <React.Fragment key={lang.code}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalOption,
                      isSelected && styles.modalOptionSelected,
                      pressed && !isSelected && styles.modalOptionPressed,
                    ]}
                    onPress={() => handleLanguageSelect(lang.code)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`${lang.label}, ${lang.nativeLabel}`}
                  >
                    <Text
                      style={[
                        styles.modalOptionLabel,
                        isSelected && styles.modalOptionLabelSelected,
                      ]}
                    >
                      {lang.nativeLabel}
                      {lang.nativeLabel !== lang.label ? `  ·  ${lang.label}` : ''}
                    </Text>
                    {isSelected && (
                      <Text style={styles.modalOptionCheck} accessibilityElementsHidden>
                        ✓
                      </Text>
                    )}
                  </Pressable>
                  {!isLast && <View style={styles.modalDivider} />}
                </React.Fragment>
              );
            })}

            <Pressable
              style={({ pressed }) => [
                styles.modalCancelButton,
                pressed && styles.modalCancelButtonPressed,
              ]}
              onPress={() => setActiveModal(null)}
              accessibilityRole="button"
              accessibilityLabel={t.common.cancel}
            >
              <Text style={styles.modalCancelText}>{t.common.cancel}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Invoice Prefix Modal ── */}
      <Modal
        visible={activeModal === 'prefix'}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
        statusBarTranslucent
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            Keyboard.dismiss();
            setActiveModal(null);
          }}
          accessibilityRole="button"
          accessibilityLabel={t.common.close}
        >
          <Pressable
            style={[styles.modalSheet, { paddingBottom: insets.bottom + 16 }]}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{t.settings.invoicePrefix}</Text>

            <View
              style={[
                styles.prefixInputWrap,
                prefixFocused && styles.prefixInputWrapFocused,
              ]}
            >
              <TextInput
                style={styles.prefixInput}
                value={prefixDraft}
                onChangeText={setPrefixDraft}
                placeholder={t.settings.invoicePrefixPlaceholder}
                placeholderTextColor={Colors.text.hint}
                autoCapitalize="characters"
                maxLength={10}
                returnKeyType="done"
                onSubmitEditing={handlePrefixApply}
                onFocus={() => setPrefixFocused(true)}
                onBlur={() => setPrefixFocused(false)}
                autoFocus
                accessibilityLabel={t.settings.invoicePrefix}
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.prefixApplyButton,
                pressed && styles.prefixApplyButtonPressed,
              ]}
              onPress={handlePrefixApply}
              accessibilityRole="button"
              accessibilityLabel={t.common.apply}
            >
              <Text style={styles.prefixApplyText}>{t.common.apply}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.modalCancelButton,
                pressed && styles.modalCancelButtonPressed,
              ]}
              onPress={() => {
                Keyboard.dismiss();
                setActiveModal(null);
              }}
              accessibilityRole="button"
              accessibilityLabel={t.common.cancel}
            >
              <Text style={styles.modalCancelText}>{t.common.cancel}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
}
