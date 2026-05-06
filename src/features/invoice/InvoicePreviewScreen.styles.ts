import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

export const styles = StyleSheet.create({

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

  // ── Scroll ───────────────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },

  // ── Invoice Paper Card ───────────────────────────────────
  invoiceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // ── Invoice Header (blue band) ───────────────────────────
  invoiceHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invoiceHeaderLeft: {
    flex: 1,
    gap: 2,
  },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  invoiceSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  },
  logoPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },

  // ── Meta row (invoice no + date) ─────────────────────────
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  metaBlock: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text.hint,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondary,
  },

  // ── Section divider ──────────────────────────────────────
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },

  // ── Bill To ──────────────────────────────────────────────
  billToSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: 4,
  },
  billToLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  billToName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.secondary,
  },
  billToPhone: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  billToEmpty: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.hint,
    fontStyle: 'italic',
  },

  // ── Items table ──────────────────────────────────────────
  tableSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.border,
    marginBottom: 2,
  },
  tableHeaderItem: {
    flex: 3,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tableHeaderQty: {
    width: 36,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tableHeaderPrice: {
    width: 72,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  tableHeaderTotal: {
    width: 72,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundSecondary,
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableCellItem: {
    flex: 3,
    gap: 1,
  },
  tableCellItemName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
  },
  tableCellItemGst: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.text.hint,
  },
  tableCellQty: {
    width: 36,
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  tableCellPrice: {
    width: 72,
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
    textAlign: 'right',
  },
  tableCellTotal: {
    width: 72,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondary,
    textAlign: 'right',
  },

  // ── Totals ───────────────────────────────────────────────
  totalsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: '#FAFAFA',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalsLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  totalsValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
  },
  totalsDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  totalsFinalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.secondary,
  },
  totalsFinalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },

  // ── Footer actions ───────────────────────────────────────
  footer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },

  // Primary — Generate PDF
  pdfButton: {
    flex: 1,
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
  pdfButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  pdfButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  pdfButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },

  // Secondary — Edit
  editButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  editButtonPressed: {
    backgroundColor: Colors.selected.background,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.2,
  },
  editButtonIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },

  // Share — full width
  shareButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  shareButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  shareButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});
