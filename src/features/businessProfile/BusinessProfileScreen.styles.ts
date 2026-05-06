import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

export const styles = StyleSheet.create({
  // ── Root ─────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: Colors.primary, // header colour bleeds into status bar
  },
  flex: {
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
    width: 30, // mirrors back button width to keep title centred
  },

  // ── Scroll ───────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.md,
  },

  // ── Logo Section ─────────────────────────────────────────
  logoSection: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  logoEmoji: {
    width: 48,
    height: 48,
  },
  logoImage: {
    width: 48,
    height: 48,
  },
  logoImageUploaded: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  uploadLogoButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  uploadLogoButtonPressed: {
    backgroundColor: '#EFF6FF',
  },
  uploadLogoText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  // ── Form Card ────────────────────────────────────────────
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  // ── Field ────────────────────────────────────────────────
  fieldGroup: {
    paddingVertical: Spacing.sm + 2,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: -Spacing.md, // bleed to card edges
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text.hint,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },

  // ── Input Row ────────────────────────────────────────────
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.sm + 2,
    backgroundColor: Colors.backgroundSecondary,
    minHeight: 48,
  },
  inputRowFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },
  inputRowError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  inputRowMultiline: {
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text.primary,
    paddingVertical: 0,
  },
  inputWithPrefix: {
    marginLeft: Spacing.xs,
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },

  // ── Phone prefix ─────────────────────────────────────────
  phonePrefix: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginRight: 2,
  },

  // ── Error text ───────────────────────────────────────────
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 2,
  },

  // ── Info note ────────────────────────────────────────────
  infoRow: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
  },

  // ── Footer / Save Button ─────────────────────────────────
  footer: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButton: {
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
  saveButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonPressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
