import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

export const styles = StyleSheet.create({
  // ── Root ─────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },

  // ── Header Bar ───────────────────────────────────────────
  headerBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
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
  headerSpacer: {
    width: 30,
  },

  // ── Scroll ───────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },

  // ── Section ──────────────────────────────────────────────
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text.hint,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },

  // ── Row ───────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 56,
  },
  rowPressed: {
    backgroundColor: Colors.backgroundSecondary,
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm + 2,
  },
  rowIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
  rowChevron: {
    width: 16,
    height: 16,
    tintColor: Colors.primary,
    transform: [{ rotate: '-90deg' }],
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.text.secondary,
    marginTop: 1,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rowValueRight: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  rowDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.md + 36 + Spacing.sm + 2, // aligns under text, not icon
  },

  // ── Toggle (theme) ────────────────────────────────────────
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackOn: {
    backgroundColor: Colors.primary,
  },
  toggleTrackOff: {
    backgroundColor: Colors.border,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  toggleThumbOff: {
    alignSelf: 'flex-start',
  },

  // ── Data action rows ──────────────────────────────────────
  rowLabelDanger: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },

  // ── Pro banner ────────────────────────────────────────────
  proBanner: {
    marginHorizontal: Spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
  },
  proBannerInner: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  proBannerPressed: {
    backgroundColor: Colors.primaryDark,
  },
  proBannerTextWrap: {
    flex: 1,
  },
  proBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  proBannerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  proBannerIcon: {
    width: 36,
    height: 36,
  },

  // ── App version ───────────────────────────────────────────
  versionRow: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text.hint,
  },

  // ── Modal overlay ─────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  modalOptionPressed: {
    backgroundColor: Colors.backgroundSecondary,
  },
  modalOptionSelected: {
    backgroundColor: Colors.selected.background,
  },
  modalOptionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  modalOptionLabelSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  modalOptionCheck: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '700',
  },
  modalDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },
  modalCancelButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  modalCancelButtonPressed: {
    backgroundColor: Colors.backgroundSecondary,
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.secondary,
  },

  // ── Prefix input modal ────────────────────────────────────
  prefixInputWrap: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    minHeight: 48,
    justifyContent: 'center',
  },
  prefixInputWrapFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.selected.background,
  },
  prefixInput: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    paddingVertical: Spacing.sm,
  },
  prefixApplyButton: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  prefixApplyButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  prefixApplyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
