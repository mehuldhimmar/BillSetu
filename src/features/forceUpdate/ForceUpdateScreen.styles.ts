import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 48,
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
    marginBottom: Spacing.xxl,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.border,
    marginBottom: Spacing.xxl,
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
