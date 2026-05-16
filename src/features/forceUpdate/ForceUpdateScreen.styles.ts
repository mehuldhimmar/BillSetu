import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  outerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },

  // ── Top: image + title + description ────────────────────────────────────
  topSection: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  updateImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  updateImage: {
    width: 141,
    height: 141,
  },
  title: {
    ...Typography.heading,
    textAlign: 'center',
    color: Colors.secondary,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.subheading,
    textAlign: 'center',
  },

  // ── What's New: capped height, internal scroll ────────────────────────────
  whatsNewContainer: {
    maxHeight: 220,                   // hard cap — scroll kicks in beyond this
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    marginVertical: Spacing.lg,
    // Shadow for card feel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  whatsNewTitle: {
    ...Typography.subheading,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: Spacing.md,
  },
  whatsNewScroll: {
    flexGrow: 0,                      // prevents ScrollView from expanding beyond parent
  },
  whatsNewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  whatsNewBullet: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 8,
    lineHeight: 20,
  },
  whatsNewItem: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },

  // ── Bottom: divider + button + version ───────────────────────────────────
  bottomSection: {
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  updateButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  updateButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.1,
  },
  updateButtonText: {
    ...Typography.button,
  },
  versionText: {
    marginTop: Spacing.lg,
    fontSize: 13,
    color: Colors.text.hint,
  },
});
