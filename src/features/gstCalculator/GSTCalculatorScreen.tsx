import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  Keyboard,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { useI18n } from '../../shared/i18n/I18nContext';
import { styles } from './GSTCalculatorScreen.styles';

// ── Types ────────────────────────────────────────────────────────────────────

type GSTMode = 'add' | 'remove';
type PresetRate = 5 | 12 | 18 | 28;
type GSTRate = PresetRate | 'custom';

const PRESET_RATES: PresetRate[] = [5, 12, 18, 28];

interface GSTResult {
  baseAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function calculateGST(
  rawAmount: number,
  gstPercent: number,
  mode: GSTMode,
): GSTResult {
  if (rawAmount <= 0 || gstPercent <= 0) {
    return { baseAmount: 0, gstAmount: 0, cgst: 0, sgst: 0, totalAmount: 0 };
  }

  let baseAmount: number;
  let gstAmount: number;

  if (mode === 'add') {
    baseAmount = rawAmount;
    gstAmount = (rawAmount * gstPercent) / 100;
  } else {
    baseAmount = (rawAmount * 100) / (100 + gstPercent);
    gstAmount = rawAmount - baseAmount;
  }

  const totalAmount = baseAmount + gstAmount;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return {
    baseAmount: parseFloat(baseAmount.toFixed(2)),
    gstAmount: parseFloat(gstAmount.toFixed(2)),
    cgst: parseFloat(cgst.toFixed(2)),
    sgst: parseFloat(sgst.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
}

function formatCurrency(value: number): string {
  if (value === 0) {
    return '₹0.00';
  }
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ── Component ────────────────────────────────────────────────────────────────

interface GSTCalculatorScreenProps {
  onBack?: () => void;
  isVisible?: boolean;
}

export function GSTCalculatorScreen({
  onBack,
  isVisible = false,
}: GSTCalculatorScreenProps) {
  const [amountText, setAmountText] = useState('');
  const [selectedRate, setSelectedRate] = useState<GSTRate>(18);
  const [customRateText, setCustomRateText] = useState('');
  const [mode, setMode] = useState<GSTMode>('add');
  const [amountFocused, setAmountFocused] = useState(false);
  const { t } = useI18n();

  const customInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);

  // Focus the amount field only when this screen becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => amountInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      Keyboard.dismiss();
    }
  }, [isVisible]);

  const activeGSTPercent = useMemo<number>(() => {
    if (selectedRate === 'custom') {
      const parsed = parseFloat(customRateText);
      return isNaN(parsed) || parsed < 0 ? 0 : parsed;
    }
    return selectedRate;
  }, [selectedRate, customRateText]);

  const result = useMemo<GSTResult>(() => {
    const amount = parseFloat(amountText);
    if (isNaN(amount) || amount <= 0) {
      return { baseAmount: 0, gstAmount: 0, cgst: 0, sgst: 0, totalAmount: 0 };
    }
    return calculateGST(amount, activeGSTPercent, mode);
  }, [amountText, activeGSTPercent, mode]);

  const hasResult = result.totalAmount > 0;

  const handleAmountChange = useCallback((text: string) => {
    const sanitised = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setAmountText(sanitised);
  }, []);

  const handleRateSelect = useCallback((rate: GSTRate) => {
    setSelectedRate(rate);
    if (rate === 'custom') {
      setTimeout(() => customInputRef.current?.focus(), 50);
    }
  }, []);

  const handleCustomRateChange = useCallback((text: string) => {
    const sanitised = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setCustomRateText(sanitised);
  }, []);

  const insets = useSafeAreaInsets();

  // Handle hardware back button — navigate to dashboard instead of closing the app
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBack?.();
        return true; // true = event handled, prevents default (app close)
      },
    );
    return () => subscription.remove();
  }, [onBack]);

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

      {/* ── Header ── */}
      <View style={styles.headerBar}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={t.common.back}
        >
          <Image source={require('../../images/back.png')} style={styles.backIcon} resizeMode="contain" accessibilityElementsHidden />
        </Pressable>
        <Text style={styles.headerTitle}>{t.gstCalculator.title}</Text>
      </View>

      {/* ── Body — flex column, no scroll ── */}
      <View style={styles.body}>

        {/* Amount */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>{t.gstCalculator.amount}</Text>
          <View
            style={[
              styles.amountInputRow,
              amountFocused && styles.amountInputRowFocused,
            ]}
          >
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              value={amountText}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor={Colors.text.hint}
              keyboardType="decimal-pad"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              onFocus={() => setAmountFocused(true)}
              onBlur={() => setAmountFocused(false)}
              accessibilityLabel={t.gstCalculator.amount}
            />
          </View>
        </View>

        {/* GST Rate */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>{t.invoice.gst}</Text>
          <View style={styles.rateRow}>
            {PRESET_RATES.map(rate => (
              <Pressable
                key={rate}
                style={[
                  styles.rateChip,
                  selectedRate === rate && styles.rateChipSelected,
                ]}
                onPress={() => handleRateSelect(rate)}
                accessibilityRole="radio"
                accessibilityLabel={`${rate} percent GST`}
                accessibilityState={{ selected: selectedRate === rate }}
              >
                <Text
                  style={[
                    styles.rateChipText,
                    selectedRate === rate && styles.rateChipTextSelected,
                  ]}
                >
                  {rate}%
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={[
                styles.rateChip,
                selectedRate === 'custom' && styles.rateChipSelected,
              ]}
              onPress={() => handleRateSelect('custom')}
              accessibilityRole="radio"
              accessibilityLabel="Custom GST rate"
              accessibilityState={{ selected: selectedRate === 'custom' }}
            >
              {selectedRate === 'custom' ? (
                <TextInput
                  ref={customInputRef}
                  style={styles.customInput}
                  value={customRateText}
                  onChangeText={handleCustomRateChange}
                  placeholder="%"
                  placeholderTextColor={Colors.text.hint}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  accessibilityLabel="Enter custom GST rate"
                  maxLength={5}
                />
              ) : (
                <Text style={styles.customPlaceholder}>Custom</Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* Mode */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>{t.gstCalculator.gstRate}</Text>
          <View style={styles.toggleRow}>
            <Pressable
              style={[
                styles.toggleButton,
                mode === 'add' && styles.toggleButtonActive,
              ]}
              onPress={() => setMode('add')}
              accessibilityRole="radio"
              accessibilityLabel={t.gstCalculator.exclusive}
              accessibilityState={{ selected: mode === 'add' }}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  mode === 'add' && styles.toggleButtonTextActive,
                ]}
              >
                + {t.gstCalculator.exclusive}
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.toggleButton,
                mode === 'remove' && styles.toggleButtonActive,
              ]}
              onPress={() => setMode('remove')}
              accessibilityRole="radio"
              accessibilityLabel={t.gstCalculator.inclusive}
              accessibilityState={{ selected: mode === 'remove' }}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  mode === 'remove' && styles.toggleButtonTextActive,
                ]}
              >
                − {t.gstCalculator.inclusive}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Breakdown */}
        <View style={styles.resultCard}>
          <Text style={styles.resultCardTitle}>Breakdown</Text>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>
              {mode === 'add' ? t.gstCalculator.baseAmount : t.invoice.subtotal}
            </Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result.baseAmount)}
            </Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>
              {t.gstCalculator.gstAmount} ({activeGSTPercent > 0 ? `${activeGSTPercent}%` : '—'})
            </Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result.gstAmount)}
            </Text>
          </View>

          {hasResult && (
            <>
              <View style={styles.gstBreakdownRow}>
                <Text style={styles.gstBreakdownLabel}>
                  CGST ({activeGSTPercent / 2}%)
                </Text>
                <Text style={styles.gstBreakdownValue}>
                  {formatCurrency(result.cgst)}
                </Text>
              </View>
              <View style={styles.gstBreakdownRow}>
                <Text style={styles.gstBreakdownLabel}>
                  SGST ({activeGSTPercent / 2}%)
                </Text>
                <Text style={styles.gstBreakdownValue}>
                  {formatCurrency(result.sgst)}
                </Text>
              </View>
            </>
          )}

          <View style={styles.resultDivider} />

          <View style={styles.resultRow}>
            <Text style={styles.resultTotalLabel}>{t.gstCalculator.totalAmount}</Text>
            <Text style={styles.resultTotalValue}>
              {formatCurrency(result.totalAmount)}
            </Text>
          </View>
        </View>



      </View>
    </View>
  );
}
