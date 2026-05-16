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
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { useI18n } from '../../shared/i18n/I18nContext';
import { styles } from './CreateInvoiceScreen.styles';

// ── Types ────────────────────────────────────────────────────────────────────

type GSTRate = 0 | 5 | 12 | 18 | 28;

const GST_RATES: GSTRate[] = [0, 5, 12, 18, 28];

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  gstRate: GSTRate;
  subtotal: number;
  gstAmount: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  totalGST: number;
  grandTotal: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateInvoiceNumber(todayCount: number, prefix: string): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const nn = String(todayCount + 1).padStart(2, '0');
  return `${prefix}${yy}${mm}${dd}${nn}`;
}

function todayString(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = String(now.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function computeItem(
  name: string,
  quantity: number,
  price: number,
  gstRate: GSTRate,
): Omit<InvoiceItem, 'id'> {
  const subtotal = quantity * price;
  const gstAmount = parseFloat(((subtotal * gstRate) / 100).toFixed(2));
  const total = parseFloat((subtotal + gstAmount).toFixed(2));
  return { name, quantity, price, gstRate, subtotal, gstAmount, total };
}

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ── Add Item Bottom Sheet ─────────────────────────────────────────────────────

interface AddItemSheetProps {
  visible: boolean;
  bottomInset: number;
  editingItem?: InvoiceItem | null;
  defaultGstRate: GSTRate;
  onClose: () => void;
  onSave: (item: Omit<InvoiceItem, 'id'>) => void;
}

function AddItemSheet({ visible, bottomInset, editingItem, defaultGstRate, onClose, onSave }: AddItemSheetProps) {
  const [name, setName] = useState('');
  const [qtyText, setQtyText] = useState('1');
  const [priceText, setPriceText] = useState('');
  const [gstRate, setGstRate] = useState<GSTRate>(0);

  const [nameFocused, setNameFocused] = useState(false);
  const [qtyFocused, setQtyFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);

  const nameRef = useRef<TextInput>(null);
  // Start fully off-screen so there's no flash before the first slide-in
  const slideAnim = useRef(new Animated.Value(600)).current;
  const { t } = useI18n();

  // Slide in when sheet becomes visible
  useEffect(() => {
    if (visible) {
      slideAnim.setValue(600);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    }
  }, [visible, slideAnim]);

  // Pre-fill fields when editing, reset when adding
  useEffect(() => {
    if (visible) {
      if (editingItem) {
        setName(editingItem.name);
        setQtyText(String(editingItem.quantity));
        setPriceText(String(editingItem.price));
        setGstRate(editingItem.gstRate);
      } else {
        setName('');
        setQtyText('1');
        setPriceText('');
        setGstRate(defaultGstRate);
      }
      setTimeout(() => nameRef.current?.focus(), 150);
    }
  }, [visible, editingItem, defaultGstRate]);

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 220,
      useNativeDriver: true,
    }).start(() => onClose());
  }, [onClose, slideAnim]);

  const handleSave = useCallback(() => {
    const trimmedName = name.trim();
    const qty = parseInt(qtyText, 10);
    const price = parseFloat(priceText);
    if (!trimmedName || isNaN(qty) || qty <= 0 || isNaN(price) || price < 0) {
      return;
    }
    Keyboard.dismiss();
    const item = computeItem(trimmedName, qty, price, gstRate);
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      onSave(item);
      onClose();
    });
  }, [name, qtyText, priceText, gstRate, onSave, onClose, slideAnim]);

  const canSave =
    name.trim().length > 0 &&
    parseInt(qtyText, 10) > 0 &&
    parseFloat(priceText) >= 0 &&
    !isNaN(parseFloat(priceText));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Tap outside to dismiss */}
        <Pressable style={styles.modalDismissArea} onPress={handleClose} />

        {/* Animated sheet — slides up from bottom */}
        <Animated.View
          style={[
            styles.bottomSheet,
            { paddingBottom: bottomInset + 16 },
            {
              transform: [{
                translateY: slideAnim,
              }],
            },
          ]}
        >

            {/* Handle */}
            <View style={styles.sheetHandle} />

            {/* Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{editingItem ? t.common.edit : t.invoice.addItem}</Text>
              <Pressable
                style={styles.sheetCloseButton}
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel={t.common.close}
              >
                <Image source={require('../../images/close.png')} style={styles.sheetCloseIcon} resizeMode="contain" accessibilityElementsHidden />
              </Pressable>
            </View>

            {/* Item Name */}
            <View style={styles.sheetInputWrapper}>
              <Text style={styles.sheetInputLabel}>{t.invoice.itemName}</Text>
              <TextInput
                ref={nameRef}
                style={[styles.sheetTextInput, nameFocused && styles.sheetTextInputFocused]}
                value={name}
                onChangeText={setName}
                placeholder={t.invoice.itemNamePlaceholder}
                placeholderTextColor={Colors.text.hint}
                returnKeyType="next"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                accessibilityLabel={t.invoice.itemName}
              />
            </View>

            {/* Qty + Price */}
            <View style={[styles.sheetRow, styles.sheetInputWrapper]}>
              <View style={styles.sheetHalf}>
                <Text style={styles.sheetInputLabel}>{t.invoice.quantity}</Text>
                <TextInput
                  style={[styles.sheetTextInput, qtyFocused && styles.sheetTextInputFocused]}
                  value={qtyText}
                  onChangeText={t2 => setQtyText(t2.replace(/[^0-9]/g, ''))}
                  placeholder="1"
                  placeholderTextColor={Colors.text.hint}
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onFocus={() => setQtyFocused(true)}
                  onBlur={() => setQtyFocused(false)}
                  accessibilityLabel={t.invoice.quantity}
                />
              </View>
              <View style={styles.sheetHalf}>
                <Text style={styles.sheetInputLabel}>{t.invoice.rate} (₹)</Text>
                <TextInput
                  style={[styles.sheetTextInput, priceFocused && styles.sheetTextInputFocused]}
                  value={priceText}
                  onChangeText={t2 =>
                    setPriceText(t2.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))
                  }
                  placeholder="0.00"
                  placeholderTextColor={Colors.text.hint}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onFocus={() => setPriceFocused(true)}
                  onBlur={() => setPriceFocused(false)}
                  accessibilityLabel={t.invoice.rate}
                />
              </View>
            </View>

            {/* GST Rate */}
            <Text style={styles.sheetInputLabel}>{t.invoice.gst}</Text>
            <View style={styles.sheetRateRow}>
              {GST_RATES.map(rate => (
                <Pressable
                  key={rate}
                  style={[styles.sheetRateChip, gstRate === rate && styles.sheetRateChipSelected]}
                  onPress={() => setGstRate(rate)}
                  accessibilityRole="radio"
                  accessibilityLabel={`${rate} percent GST`}
                  accessibilityState={{ selected: gstRate === rate }}
                >
                  <Text style={[styles.sheetRateChipText, gstRate === rate && styles.sheetRateChipTextSelected]}>
                    {rate}%
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Save */}
            <Pressable
              style={({ pressed }) => [
                styles.saveItemButton,
                pressed && styles.saveItemButtonPressed,
                !canSave && { opacity: 0.5 },
              ]}
              onPress={handleSave}
              disabled={!canSave}
              accessibilityRole="button"
              accessibilityLabel={t.common.save}
              accessibilityState={{ disabled: !canSave }}
            >
              <Text style={styles.saveItemButtonText}>{editingItem ? t.common.edit : t.common.save}</Text>
            </Pressable>

          </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

interface CreateInvoiceScreenProps {
  onBack?: () => void;
  onPreview?: (invoice: InvoiceData) => void;
  /** All saved invoices — used to compute today's sequential number */
  existingInvoices?: { invoiceNumber: string }[];
  /** Prefix from settings, e.g. 'INV-' */
  invoicePrefix?: string;
}

export function CreateInvoiceScreen({
  onBack,
  onPreview,
  existingInvoices = [],
  invoicePrefix = 'INV-',
}: CreateInvoiceScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const [invoiceNumber] = useState(() => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayPrefix = `${invoicePrefix}${yy}${mm}${dd}`;
    const todayCount = existingInvoices.filter(inv =>
      inv.invoiceNumber.startsWith(todayPrefix),
    ).length;
    return generateInvoiceNumber(todayCount, invoicePrefix);
  });
  const [date] = useState(todayString);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);
  const [lastGstRate, setLastGstRate] = useState<GSTRate>(0);
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const customerNameRef = useRef<TextInput>(null);
  const customerPhoneRef = useRef<TextInput>(null);

  // ── Collapsible customer details ─────────────────────────
  const [customerExpanded, setCustomerExpanded] = useState(true);
  const collapseAnim = useRef(new Animated.Value(1)).current;

  const toggleCustomer = useCallback(() => {
    const toValue = customerExpanded ? 0 : 1;
    Animated.timing(collapseAnim, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setCustomerExpanded(v => !v);
    if (customerExpanded) Keyboard.dismiss();
  }, [customerExpanded, collapseAnim]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack?.();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const totalGST = items.reduce((s, i) => s + i.gstAmount, 0);
  const grandTotal = items.reduce((s, i) => s + i.total, 0);

  const openAddSheet = useCallback(() => {
    customerNameRef.current?.blur();
    customerPhoneRef.current?.blur();
    Keyboard.dismiss();
    setEditingItem(null);
    setSheetVisible(true);
  }, []);

  const openEditSheet = useCallback((item: InvoiceItem) => {
    customerNameRef.current?.blur();
    customerPhoneRef.current?.blur();
    Keyboard.dismiss();
    setEditingItem(item);
    setSheetVisible(true);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetVisible(false);
    setEditingItem(null);
  }, []);

  const handleSaveItem = useCallback((item: Omit<InvoiceItem, 'id'>) => {
    // Remember the GST rate for the next new item
    setLastGstRate(item.gstRate);
    if (editingItem) {
      // Update existing item in place
      setItems(prev =>
        prev.map(i => i.id === editingItem.id ? { ...item, id: editingItem.id } : i),
      );
    } else {
      // Append new item
      setItems(prev => [...prev, { ...item, id: `${Date.now()}-${Math.random()}` }]);
    }
  }, [editingItem]);

  const handleDeleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const handlePreview = useCallback(() => {
    Keyboard.dismiss();
    onPreview?.({
      invoiceNumber,
      date,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items,
      subtotal,
      totalGST,
      grandTotal,
    });
  }, [onPreview, invoiceNumber, date, customerName, customerPhone, items, subtotal, totalGST, grandTotal]);

  const canPreview = items.length > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

      {/* Header */}
      <View style={styles.headerBar}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={t.common.back}
        >
          <Image source={require('../../images/back.png')} style={styles.backIcon} resizeMode="contain" accessibilityElementsHidden />
        </Pressable>
        <Text style={styles.headerTitle}>{t.invoice.createTitle}</Text>
        <View style={styles.invoiceNumberBadge}>
          <Text style={styles.invoiceNumberText}>{invoiceNumber}</Text>
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 16 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Details — collapsible */}
        <View style={styles.card}>
          {/* Tappable header row */}
          <Pressable
            style={styles.sectionHeaderRow}
            onPress={toggleCustomer}
            accessibilityRole="button"
            accessibilityLabel={t.invoice.billTo}
            accessibilityState={{ expanded: customerExpanded }}
          >
            <Text style={styles.sectionLabel}>{t.invoice.billTo}</Text>
            {/* Dedicated hit area for the chevron */}
            <View style={styles.chevronHitArea}>
              <Image
                source={require('../../images/down.png')}
                style={[
                  styles.collapseIcon,
                  { transform: [{ rotate: customerExpanded ? '180deg' : '0deg' }] },
                ]}
                resizeMode="contain"
                accessibilityElementsHidden
              />
            </View>
          </Pressable>

          {/* Animated collapsible body */}
          <Animated.View
            style={{
              opacity: collapseAnim,
              maxHeight: collapseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 400],
              }),
              overflow: 'hidden',
            }}
          >
            <View style={styles.dateRow}>
              <View style={[styles.inputWrapper, styles.dateField]}>
                <Text style={styles.inputLabel}>{t.invoice.invoiceDate}</Text>
                <TextInput
                  style={styles.textInput}
                  value={date}
                  editable={false}
                  accessibilityLabel={t.invoice.invoiceDate}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{t.invoice.customerName}</Text>
              <TextInput
                ref={customerNameRef}
                style={[styles.textInput, nameFocused && styles.textInputFocused]}
                value={customerName}
                onChangeText={setCustomerName}
                placeholder={t.invoice.customerNamePlaceholder}
                placeholderTextColor={Colors.text.hint}
                returnKeyType="next"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                accessibilityLabel={t.invoice.customerName}
              />
            </View>

            <View style={[styles.inputWrapper, { marginBottom: 0 }]}>
              <Text style={styles.inputLabel}>{t.invoice.customerPhone}</Text>
              <TextInput
                ref={customerPhoneRef}
                style={[
                  styles.textInput,
                  phoneFocused && styles.textInputFocused,
                  phoneError && styles.textInputError,
                ]}
                value={customerPhone}
                onChangeText={text => {
                  // digits only
                  const digits = text.replace(/[^0-9]/g, '');
                  setCustomerPhone(digits);
                  // clear error as user types
                  if (phoneError) { setPhoneError(false); }
                }}
                placeholder={t.invoice.customerPhonePlaceholder}
                placeholderTextColor={Colors.text.hint}
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                onFocus={() => { setPhoneFocused(true); setPhoneError(false); }}
                onBlur={() => {
                  setPhoneFocused(false);
                  // validate only if user entered something
                  if (customerPhone.length > 0 && customerPhone.length !== 10) {
                    setPhoneError(true);
                  }
                }}
                accessibilityLabel={t.invoice.customerPhone}
                maxLength={10}
              />
              {phoneError && (
                <Text style={styles.inputError}>{t.invoice.phoneError}</Text>
              )}
            </View>
          </Animated.View>

          {/* Collapsed summary — date + customer name in one row */}
          {!customerExpanded && (
            <View style={styles.collapsedSummaryRow}>
              <Text style={styles.collapsedSummaryDate}>{date}</Text>
              <View style={styles.collapsedSummaryDot} />
              <Text style={styles.collapsedSummaryName} numberOfLines={1}>
                {customerName.trim().length > 0 ? customerName.trim() : 'No customer'}
              </Text>
            </View>
          )}
        </View>

        {/* Items */}
        <View style={styles.card}>
          <View style={styles.itemsHeader}>
            <Text style={styles.sectionLabel}>{t.invoice.items}</Text>
            <Pressable
              style={styles.addItemButton}
              onPress={openAddSheet}
              accessibilityRole="button"
              accessibilityLabel={t.invoice.addItem}
            >
              <Image
                source={require('../../images/add.png')}
                style={styles.addItemButtonIcon}
                resizeMode="contain"
                accessibilityElementsHidden
              />
              <Text style={styles.addItemButtonText}>{t.invoice.addItem}</Text>
            </Pressable>
          </View>

          {items.length === 0 ? (
            <View style={styles.emptyItems}>
              <Image source={require('../../images/empty.png')} style={styles.emptyItemsIcon} resizeMode="contain" accessibilityElementsHidden />
              <Text style={styles.emptyItemsText}>{t.invoice.noItems}</Text>
            </View>
          ) : (
            items.map((item, index) => (
              <View
                key={item.id}
                style={[styles.itemRow, index === items.length - 1 && styles.itemRowLast]}
              >
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    {item.quantity} × {formatCurrency(item.price)}
                    {item.gstRate > 0 ? `  ·  GST ${item.gstRate}%` : ''}
                  </Text>
                </View>
                <Text style={styles.itemTotal}>{formatCurrency(item.total)}</Text>
                <Pressable
                  style={styles.itemEditButton}
                  onPress={() => openEditSheet(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Edit ${item.name}`}
                >
                  <Image source={require('../../images/edit.png')} style={styles.itemEditIcon} resizeMode="contain" accessibilityElementsHidden />
                </Pressable>
                <Pressable
                  style={styles.itemDeleteButton}
                  onPress={() => handleDeleteItem(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${item.name}`}
                >
                  <Image source={require('../../images/delete.png')} style={styles.itemDeleteIcon} resizeMode="contain" accessibilityElementsHidden />
                </Pressable>
              </View>
            ))
          )}
        </View>

        {/* Summary */}
        {items.length > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{t.invoice.subtotal}</Text>
              <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{t.invoice.gst}</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalGST)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>{t.invoice.total}</Text>
              <Text style={styles.summaryTotalValue}>{formatCurrency(grandTotal)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.previewButton,
            pressed && styles.previewButtonPressed,
            !canPreview && { opacity: 0.5 },
          ]}
          onPress={handlePreview}
          disabled={!canPreview}
          accessibilityRole="button"
          accessibilityLabel={t.invoice.previewInvoice}
          accessibilityState={{ disabled: !canPreview }}
        >
          <Image source={require('../../images/preview.png')} style={styles.previewButtonIcon} resizeMode="contain" accessibilityElementsHidden />
          <Text style={styles.previewButtonText}>{t.invoice.previewInvoice}</Text>
        </Pressable>
      </View>

      {/* Add / Edit Item Bottom Sheet */}
      <AddItemSheet
        visible={sheetVisible}
        defaultGstRate={editingItem ? editingItem.gstRate : lastGstRate}
        bottomInset={insets.bottom}
        editingItem={editingItem}
        onClose={closeSheet}
        onSave={handleSaveItem}
      />
    </View>
  );
}
