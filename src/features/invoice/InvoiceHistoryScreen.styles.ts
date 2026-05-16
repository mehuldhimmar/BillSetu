import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing } from '../../theme';

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

  // ── Search bar ───────────────────────────────────────────
  searchWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  searchBarFocused: {
    backgroundColor: '#FFFFFF',
    borderColor: Colors.primary,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: 'rgba(255,255,255,0.7)',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.secondary,
    padding: 0,
  },
  searchClearIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.text.hint,
  },

  // ── List ─────────────────────────────────────────────────
  listContent: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    flexGrow: 1,
  },
  listHeader: {
    marginBottom: Spacing.sm,
  },
  listHeaderCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.hint,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  separator: {
    height: Spacing.sm,
  },

  // ── Invoice row card ─────────────────────────────────────
  rowCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },

  // Top section — invoice info
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  rowBadge: {
    backgroundColor: Colors.selected.background,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    maxWidth: 120,
  },
  rowBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  rowMeta: {
    flex: 1,
    minWidth: 0,
  },
  rowCustomer: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 2,
  },
  rowItemCount: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.hint,
  },
  rowAmountBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  rowAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
  },
  rowDate: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.hint,
  },

  // Divider between info and actions
  rowDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  // Bottom action buttons
  rowActions: {
    flexDirection: 'row',
  },
  rowActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm + 2,
  },

  // View button
  rowViewBtn: {
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  rowViewBtnPressed: {
    backgroundColor: Colors.selected.background,
  },
  rowViewBtnIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.primary,
  },
  rowViewBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },

  // Delete button
  rowDeleteBtn: {},
  rowDeleteBtnPressed: {
    backgroundColor: '#FEF2F2',
  },
  rowDeleteBtnIcon: {
    width: 22,
    height: 22,
    tintColor: '#EF4444',
  },
  rowDeleteBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },

  // ── Empty state ──────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    marginBottom: Spacing.sm,
    tintColor: Colors.text.hint,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text.hint,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.xl,
  },
});
