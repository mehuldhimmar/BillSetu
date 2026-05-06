import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing } from '../../theme';

// Explicit type ensures TS picks up all keys immediately
type Styles = {
  [key: string]: ViewStyle | TextStyle;
};

export const styles = StyleSheet.create<Styles>({

  // ── Root ─────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  // ── Header ───────────────────────────────────────────────
  headerBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    height: 56,
  },
  backButton: {
    paddingRight: Spacing.sm,
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  invoiceNumberBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  invoiceNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ── Scroll body ──────────────────────────────────────────
  scrollBody: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },

  // ── Shared card ──────────────────────────────────────────
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  collapseChevron: {
    fontSize: 18,
    color: Colors.text.hint,
    lineHeight: 20,
  },
  chevronHitArea: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -Spacing.sm,
  },
  collapseIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.text.hint,
  },
  collapsedSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: Spacing.sm,
  },
  collapsedSummaryDate: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  collapsedSummaryDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.text.hint,
  },
  collapsedSummaryName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
  },

  // ── Text inputs ──────────────────────────────────────────
  inputWrapper: {
    marginBottom: Spacing.sm,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.secondary,
    backgroundColor: Colors.backgroundSecondary,
  },
  textInputFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },

  // ── Date row ─────────────────────────────────────────────
  dateRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  dateField: {
    flex: 1,
  },

  // ── Items section ────────────────────────────────────────
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
  },
  addItemButtonIcon: {
    width: 11,
    height: 11,
    tintColor: '#FFFFFF',
  },
  addItemButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Empty items state ────────────────────────────────────
  emptyItems: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  emptyItemsIcon: {
    width: 48,
    height: 48,
  },
  emptyItemsText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.hint,
  },

  // ── Item row ─────────────────────────────────────────────
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  itemRowLast: {
    borderBottomWidth: 0,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.hint,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary,
  },
  itemDeleteButton: {
    padding: 4,
  },
  itemDeleteIcon: {
    width: 22,
    height: 22,
    tintColor: '#EF4444',
  },
  itemEditButton: {
    padding: 4,
  },
  itemEditIcon: {
    width: 18,
    height: 18,
  },

  // ── Summary card ─────────────────────────────────────────
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },

  // ── Footer CTA ───────────────────────────────────────────
  footer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  previewButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  previewButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  previewButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },

  // ── Add Item Modal ────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.secondary,
  },
  sheetCloseButton: {
    padding: 4,
  },
  sheetCloseIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.text.hint,
  },
  sheetInputWrapper: {
    marginBottom: Spacing.md,
  },
  sheetInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  sheetTextInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.secondary,
    backgroundColor: Colors.backgroundSecondary,
  },
  sheetTextInputFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },
  sheetRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sheetHalf: {
    flex: 1,
  },
  sheetRateRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  sheetRateChip: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetRateChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },
  sheetRateChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  sheetRateChipTextSelected: {
    color: Colors.primary,
  },
  saveItemButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  saveItemButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  saveItemButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
