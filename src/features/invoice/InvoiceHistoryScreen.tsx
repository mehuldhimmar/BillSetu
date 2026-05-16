import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showAlert } from '../../shared/components/AppAlert';
import { Colors } from '../../theme';
import { useI18n } from '../../shared/i18n/I18nContext';
import { InvoiceData } from './CreateInvoiceScreen';
import { styles } from './InvoiceHistoryScreen.styles';

// ── Types ────────────────────────────────────────────────────────────────────

export interface StoredInvoice extends InvoiceData {
  /** Unique key used as FlatList keyExtractor */
  id: string;
  /** ISO timestamp of when the invoice was saved */
  savedAt: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** "18 Apr" style short date from dd/mm/yyyy */
function shortDate(ddmmyyyy: string): string {
  const parts = ddmmyyyy.split('/');
  if (parts.length !== 3) { return ddmmyyyy; }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  return `${day} ${months[month] ?? ''}`;
}

// ── Invoice Row ───────────────────────────────────────────────────────────────

interface InvoiceRowProps {
  invoice: StoredInvoice;
  onView: (invoice: StoredInvoice) => void;
  onDelete: (invoice: StoredInvoice) => void;
}

const InvoiceRow = React.memo(function InvoiceRow({
  invoice,
  onView,
  onDelete,
}: InvoiceRowProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { t } = useI18n();

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const itemCount = invoice.items.length;
  const customerLabel = invoice.customerName.trim() || t.invoice.noCustomer;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <View
        style={styles.rowCard}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
      >
        {/* Top row — invoice info */}
        <View style={styles.rowTop}>
          <View style={styles.rowBadge}>
            <Text style={styles.rowBadgeText} numberOfLines={1}>
              {invoice.invoiceNumber}
            </Text>
          </View>
          <View style={styles.rowMeta}>
            <Text style={styles.rowCustomer} numberOfLines={1}>
              {customerLabel}
            </Text>
            <Text style={styles.rowItemCount}>
              {itemCount} {itemCount === 1 ? t.invoice.itemCount_one : t.invoice.itemCount_other}
            </Text>
          </View>
          <View style={styles.rowAmountBlock}>
            <Text style={styles.rowAmount}>{formatCurrency(invoice.grandTotal)}</Text>
            <Text style={styles.rowDate}>{shortDate(invoice.date)}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.rowDivider} />

        {/* Bottom row — action buttons */}
        <View style={styles.rowActions}>
          <Pressable
            style={({ pressed }) => [styles.rowActionBtn, styles.rowViewBtn, pressed && styles.rowViewBtnPressed]}
            onPress={() => onView(invoice)}
            accessibilityRole="button"
            accessibilityLabel={`${t.invoice.preview} ${invoice.invoiceNumber}`}
          >
            <Image source={require('../../images/preview.png')} style={styles.rowViewBtnIcon} resizeMode="contain" accessibilityElementsHidden />
            <Text style={styles.rowViewBtnText}>{t.invoice.preview}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.rowActionBtn, styles.rowDeleteBtn, pressed && styles.rowDeleteBtnPressed]}
            onPress={() => onDelete(invoice)}
            accessibilityRole="button"
            accessibilityLabel={`${t.common.delete} ${invoice.invoiceNumber}`}
          >
            <Image source={require('../../images/delete.png')} style={styles.rowDeleteBtnIcon} resizeMode="contain" accessibilityElementsHidden />
            <Text style={styles.rowDeleteBtnText}>{t.common.delete}</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
});

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ isFiltered }: { isFiltered: boolean }) {
  const { t } = useI18n();
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={isFiltered ? require('../../images/search.png') : require('../../images/empty.png')}
        style={styles.emptyIcon}
        resizeMode="contain"
        accessibilityElementsHidden
      />
      <Text style={styles.emptyTitle}>
        {isFiltered ? t.invoiceHistory.noResults : t.invoiceHistory.empty}
      </Text>
      <Text style={styles.emptySubtitle}>
        {isFiltered
          ? t.invoiceHistory.noResultsSubtitle
          : t.invoiceHistory.emptySubtitle}
      </Text>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

interface InvoiceHistoryScreenProps {
  invoices?: StoredInvoice[];
  onBack?: () => void;
  onViewInvoice?: (invoice: StoredInvoice) => void;
  onDeleteInvoice?: (id: string) => void;
}

export function InvoiceHistoryScreen({
  invoices = DEMO_INVOICES,
  onBack,
  onViewInvoice,
  onDeleteInvoice,
}: InvoiceHistoryScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Hardware back
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack?.();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  // Filtered list — matches invoice number or customer name
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { return invoices; }
    return invoices.filter(
      inv =>
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q),
    );
  }, [invoices, searchQuery]);

  const handleView = useCallback(
    (invoice: StoredInvoice) => onViewInvoice?.(invoice),
    [onViewInvoice],
  );

  const handleDelete = useCallback(
    (invoice: StoredInvoice) => {
      showAlert({
        title: t.invoiceHistory.deleteConfirm,
        message: `${t.common.delete} ${invoice.invoiceNumber}? ${t.invoiceHistory.deleteCannotUndo}`,
        buttons: [
          { text: t.common.cancel, style: 'cancel' },
          {
            text: t.common.delete,
            style: 'destructive',
            onPress: () => onDeleteInvoice?.(invoice.id),
          },
        ],
      });
    },
    [onDeleteInvoice, t],
  );

  const renderItem = useCallback(
    ({ item }: { item: StoredInvoice }) => (
      <InvoiceRow
        invoice={item}
        onView={handleView}
        onDelete={handleDelete}
      />
    ),
    [handleView, handleDelete],
  );

  const keyExtractor = useCallback((item: StoredInvoice) => item.id, []);

  const ListHeader = useMemo(
    () => (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderCount}>
          {filtered.length} {filtered.length === 1 ? t.invoiceHistory.invoiceCount_one : t.invoiceHistory.invoiceCount_other}
        </Text>
      </View>
    ),
    [filtered.length, t],
  );

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
        >
          <Image source={require('../../images/back.png')} style={styles.backIcon} resizeMode="contain" accessibilityElementsHidden />
        </Pressable>
        <Text style={styles.headerTitle}>{t.invoiceHistory.title}</Text>
      </View>

      {/* ── Search bar ── */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchBar, searchFocused && styles.searchBarFocused]}>
          <Image source={require('../../images/search.png')} style={styles.searchIcon} resizeMode="contain" accessibilityElementsHidden />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t.invoiceHistory.searchPlaceholder}
            placeholderTextColor={Colors.text.hint}
            returnKeyType="search"
            clearButtonMode="while-editing"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            accessibilityLabel="Search invoices"
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
            >
              <Image source={require('../../images/close.png')} style={styles.searchClearIcon} resizeMode="contain" accessibilityElementsHidden />
            </Pressable>
          )}
        </View>
      </View>

      {/* ── List ── */}
      <FlatList
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={filtered.length > 0 ? ListHeader : null}
        ListEmptyComponent={<EmptyState isFiltered={searchQuery.trim().length > 0} />}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

// ── Demo data (shown when no invoices prop is passed) ─────────────────────────

const DEMO_INVOICES: StoredInvoice[] = [
  {
    id: 'demo-1',
    invoiceNumber: 'INV-2504-001',
    date: '18/04/2025',
    savedAt: new Date().toISOString(),
    customerName: 'Rahul Sharma',
    customerPhone: '9876543210',
    items: [
      { id: 'i1', name: 'Rice (5 kg)', quantity: 2, price: 150, gstRate: 5, subtotal: 300, gstAmount: 15, total: 315 },
      { id: 'i2', name: 'Cooking Oil', quantity: 1, price: 180, gstRate: 5, subtotal: 180, gstAmount: 9, total: 189 },
    ],
    subtotal: 480,
    totalGST: 24,
    grandTotal: 504,
  },
  {
    id: 'demo-2',
    invoiceNumber: 'INV-2504-002',
    date: '17/04/2025',
    savedAt: new Date().toISOString(),
    customerName: 'Priya Patel',
    customerPhone: '',
    items: [
      { id: 'i3', name: 'Web Design', quantity: 1, price: 1000, gstRate: 18, subtotal: 1000, gstAmount: 180, total: 1180 },
    ],
    subtotal: 1000,
    totalGST: 180,
    grandTotal: 1180,
  },
  {
    id: 'demo-3',
    invoiceNumber: 'INV-2504-003',
    date: '15/04/2025',
    savedAt: new Date().toISOString(),
    customerName: '',
    customerPhone: '',
    items: [
      { id: 'i4', name: 'Consulting', quantity: 3, price: 500, gstRate: 18, subtotal: 1500, gstAmount: 270, total: 1770 },
    ],
    subtotal: 1500,
    totalGST: 270,
    grandTotal: 1770,
  },
  {
    id: 'demo-4',
    invoiceNumber: 'INV-2504-004',
    date: '12/04/2025',
    savedAt: new Date().toISOString(),
    customerName: 'Amit Verma',
    customerPhone: '9123456789',
    items: [
      { id: 'i5', name: 'Laptop Repair', quantity: 1, price: 800, gstRate: 12, subtotal: 800, gstAmount: 96, total: 896 },
      { id: 'i6', name: 'Spare Parts', quantity: 2, price: 250, gstRate: 12, subtotal: 500, gstAmount: 60, total: 560 },
    ],
    subtotal: 1300,
    totalGST: 156,
    grandTotal: 1456,
  },
];
