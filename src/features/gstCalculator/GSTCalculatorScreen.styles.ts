import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary, // matches header so status bar bg is seamless
  },

  // ── Header Bar ──────────────────────────────────────────
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
    paddingRight: 8,
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  // ── Body — fills remaining height, no scroll ─────────────
  body: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },

  // ── Shared Card ──────────────────────────────────────────
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text.hint,
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── Amount Input ─────────────────────────────────────────
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
  },
  amountInputRowFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.selected.background,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.secondary,
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    color: Colors.secondary,
    paddingVertical: Spacing.sm,
  },

  // ── GST Rate Chips ───────────────────────────────────────
  rateRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  rateChip: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.selected.background,
  },
  rateChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  rateChipTextSelected: {
    color: Colors.primary,
  },
  customInput: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
    padding: 0,
    minWidth: 36,
  },
  customPlaceholder: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.hint,
  },

  // ── Mode Toggle ──────────────────────────────────────────
  toggleRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  toggleButtonTextActive: {
    color: '#FFFFFF',
  },

  // ── Result Card ──────────────────────────────────────────
  resultCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'space-between',
  },
  resultCardTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text.hint,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  resultDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary,
  },
  resultTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  resultTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  gstBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Spacing.md,
    paddingVertical: 3,
  },
  gstBreakdownLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.hint,
  },
  gstBreakdownValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
  },

  // ── Use in Invoice Button ────────────────────────────────
  primaryButton: {
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
  primaryButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  primaryButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});
