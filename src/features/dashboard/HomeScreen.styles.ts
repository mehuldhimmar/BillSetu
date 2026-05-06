import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  // Root bg = primary so status bar area matches the blue header
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    // paddingBottom is set dynamically via insets in the component
  },

  // ── Top Header Bar ──────────────────────────────────────
  headerBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl + Spacing.lg,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // ── Stats Card (overlaps header) ────────────────────────
  statsCardWrapper: {
    paddingHorizontal: Spacing.lg,
    marginTop: -(Spacing.xxl),
  },
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.secondary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.hint,
  },

  // ── Body ────────────────────────────────────────────────
  body: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },

  // ── Primary CTA ─────────────────────────────────────────
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: Spacing.lg + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  primaryButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  primaryButtonIcon: {
    width: 18,
    height: 18,
    marginRight: Spacing.sm,
    tintColor: '#FFFFFF',
  },
  primaryButtonText: {
    ...Typography.button,
    fontSize: 18,
    letterSpacing: 0.4,
  },

  // ── Section Header ───────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },

  // ── Grid ─────────────────────────────────────────────────
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
});
