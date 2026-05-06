import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm + 4,
  },
  cardSelected: {
    borderColor: Colors.selected.border,
    backgroundColor: Colors.selected.background,
  },
  cardPressed: {
    opacity: 0.75,
  },
  label: {
    ...Typography.languageOption,
    flex: 1,
  },
  labelSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  sublabel: {
    fontSize: 13,
    color: Colors.text.hint,
    marginLeft: Spacing.sm,
  },
  sublabelSelected: {
    color: Colors.primaryLight,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  checkmarkText: {
    color: Colors.text.inverse,
    fontSize: 13,
    fontWeight: '700',
  },
});
