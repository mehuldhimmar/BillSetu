import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.2,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text.primary,
  },
  button: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text.inverse,
    letterSpacing: 0.3,
  },
  languageOption: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.primary,
  },
});
