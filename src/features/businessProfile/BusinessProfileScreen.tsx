import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import {
  BusinessProfile,
  loadBusinessProfile,
  saveBusinessProfile,
} from '../../shared/utils/businessProfileStorage';
import { showAlert } from '../../shared/components/AppAlert';
import { useI18n } from '../../shared/i18n/I18nContext';
import { styles } from './BusinessProfileScreen.styles';

// ── Helpers ──────────────────────────────────────────────────────────────────

function isValidGSTIN(gstin: string): boolean {
  if (gstin.trim() === '') { return true; } // optional field
  // Standard GSTIN format: 15 alphanumeric characters
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
    gstin.trim().toUpperCase(),
  );
}

function isValidPhone(phone: string): boolean {
  if (phone.trim() === '') { return true; } // optional field
  return /^[6-9]\d{9}$/.test(phone.trim());
}

// ── Component ────────────────────────────────────────────────────────────────

interface BusinessProfileScreenProps {
  onBack?: () => void;
}

export function BusinessProfileScreen({ onBack }: BusinessProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  // ── Form state ──────────────────────────────────────────
  const [businessName, setBusinessName] = useState('');
  const [gstin, setGstin] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [logoUri, setLogoUri] = useState<string | null>(null);

  // ── UI state ────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedOnce, setSavedOnce] = useState(false);

  // ── Focus state ─────────────────────────────────────────
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // ── Refs for focus chain ─────────────────────────────────
  const gstinRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  // ── Load saved profile on mount ──────────────────────────
  useEffect(() => {
    (async () => {
      const profile = await loadBusinessProfile();
      if (profile) {
        setBusinessName(profile.businessName);
        setGstin(profile.gstin);
        setPhone(profile.phone);
        setAddress(profile.address);
        if (profile.logoUri) { setLogoUri(profile.logoUri); }
        setSavedOnce(true);
      }
      setIsLoading(false);
    })();
  }, []);

  // ── Android back handler ─────────────────────────────────
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack?.();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  // ── Derived validation ───────────────────────────────────
  const gstinError =
    gstin.trim() !== '' && !isValidGSTIN(gstin)
      ? 'Enter a valid 15-character GSTIN'
      : null;

  const phoneError =
    phone.trim() !== '' && !isValidPhone(phone)
      ? 'Enter a valid 10-digit mobile number'
      : null;

  const canSave =
    businessName.trim().length > 0 &&
    gstinError === null &&
    phoneError === null;

  // ── Logo upload handler ──────────────────────────────────
  const handleUploadLogo = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
      response => {
        if (response.didCancel || response.errorCode) { return; }
        const uri = response.assets?.[0]?.uri;
        if (uri) { setLogoUri(uri); }
      },
    );
  }, []);

  // ── Save handler ─────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!canSave) { return; }
    Keyboard.dismiss();
    setIsSaving(true);

    const profile: BusinessProfile = {
      businessName: businessName.trim(),
      gstin: gstin.trim().toUpperCase(),
      phone: phone.trim(),
      address: address.trim(),
      logoUri: logoUri ?? undefined,
    };

    try {
      await saveBusinessProfile(profile);
      setSavedOnce(true);
      showAlert({
        title: t.common.success,
        message: t.businessProfile.profileSaved,
        buttons: [{ text: t.common.ok, onPress: onBack }],
      });
    } catch {
      showAlert({ title: t.alerts.errorTitle, message: t.businessProfile.errorSave });
    } finally {
      setIsSaving(false);
    }
  }, [canSave, businessName, gstin, phone, address, logoUri, onBack, t]);

  // ── Render ───────────────────────────────────────────────
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
        <Text style={styles.headerTitle}>{t.businessProfile.title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Logo placeholder ── */}
          <View style={styles.logoSection}>
            <Pressable
              style={({ pressed }) => [styles.logoCircle, pressed && { opacity: 0.8 }]}
              onPress={handleUploadLogo}
              accessibilityRole="button"
              accessibilityLabel="Upload business logo"
            >
              {logoUri ? (
                <Image source={{ uri: logoUri }} style={styles.logoImageUploaded} resizeMode="cover" />
              ) : (
                <Image source={require('../../images/profile.png')} style={styles.logoImage} resizeMode="contain" accessibilityElementsHidden />
              )}
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.uploadLogoButton,
                pressed && styles.uploadLogoButtonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={t.businessProfile.logoHint}
              onPress={handleUploadLogo}
            >
              <Text style={styles.uploadLogoText}>
                {logoUri ? t.businessProfile.changeLogoHint : t.businessProfile.logoHint}
              </Text>
            </Pressable>
          </View>

          {/* ── Form card ── */}
          <View style={styles.card}>

            {/* Business Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                {t.businessProfile.businessName} <Text style={styles.required}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputRow,
                  focusedField === 'businessName' && styles.inputRowFocused,
                ]}
              >
                <TextInput
                  style={styles.input}
                  value={businessName}
                  onChangeText={setBusinessName}
                  placeholder={t.businessProfile.businessNamePlaceholder}
                  placeholderTextColor={Colors.text.hint}
                  returnKeyType="next"
                  onSubmitEditing={() => gstinRef.current?.focus()}
                  onFocus={() => setFocusedField('businessName')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="words"
                  maxLength={80}
                  accessibilityLabel={t.businessProfile.businessName}
                />
              </View>
            </View>

            <View style={styles.fieldDivider} />

            {/* GSTIN */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.businessProfile.gstin}</Text>
              <View
                style={[
                  styles.inputRow,
                  focusedField === 'gstin' && styles.inputRowFocused,
                  gstinError !== null && styles.inputRowError,
                ]}
              >
                <TextInput
                  ref={gstinRef}
                  style={styles.input}
                  value={gstin}
                  onChangeText={text => setGstin(text.toUpperCase())}
                  placeholder={t.businessProfile.gstinPlaceholder}
                  placeholderTextColor={Colors.text.hint}
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  onFocus={() => setFocusedField('gstin')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="characters"
                  maxLength={15}
                  accessibilityLabel={t.businessProfile.gstin}
                />
              </View>
              {gstinError !== null && (
                <Text style={styles.errorText} accessibilityRole="alert">
                  {gstinError}
                </Text>
              )}
            </View>

            <View style={styles.fieldDivider} />

            {/* Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.businessProfile.phone}</Text>
              <View
                style={[
                  styles.inputRow,
                  focusedField === 'phone' && styles.inputRowFocused,
                  phoneError !== null && styles.inputRowError,
                ]}
              >
                <Text style={styles.phonePrefix}>+91</Text>
                <TextInput
                  ref={phoneRef}
                  style={[styles.input, styles.inputWithPrefix]}
                  value={phone}
                  onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
                  placeholder={t.businessProfile.phonePlaceholder}
                  placeholderTextColor={Colors.text.hint}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => addressRef.current?.focus()}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={10}
                  accessibilityLabel={t.businessProfile.phone}
                />
              </View>
              {phoneError !== null && (
                <Text style={styles.errorText} accessibilityRole="alert">
                  {phoneError}
                </Text>
              )}
            </View>

            <View style={styles.fieldDivider} />

            {/* Address */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.businessProfile.address}</Text>
              <View
                style={[
                  styles.inputRow,
                  styles.inputRowMultiline,
                  focusedField === 'address' && styles.inputRowFocused,
                ]}
              >
                <TextInput
                  ref={addressRef}
                  style={[styles.input, styles.inputMultiline]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder={t.businessProfile.addressPlaceholder}
                  placeholderTextColor={Colors.text.hint}
                  multiline
                  numberOfLines={3}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  onFocus={() => setFocusedField('address')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={200}
                  accessibilityLabel={t.businessProfile.address}
                />
              </View>
            </View>

          </View>

          {/* ── Info note ── */}
          {savedOnce && (
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                ✅ Profile saved — used on all your invoices
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Save button — pinned to bottom ── */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            (!canSave || isSaving) && styles.saveButtonDisabled,
            pressed && canSave && !isSaving && styles.saveButtonPressed,
          ]}
          onPress={handleSave}
          disabled={!canSave || isSaving}
          accessibilityRole="button"
          accessibilityLabel={t.businessProfile.saveProfile}
          accessibilityState={{ disabled: !canSave || isSaving }}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? '...' : t.businessProfile.saveProfile}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
