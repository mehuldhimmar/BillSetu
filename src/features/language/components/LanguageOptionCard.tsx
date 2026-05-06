import React from 'react';
import { Pressable, Text, View, AccessibilityState } from 'react-native';
import { Language } from '../../../shared/constants/languages';
import { styles } from './LanguageOptionCard.styles';

interface LanguageOptionCardProps {
  language: Language;
  isSelected: boolean;
  onSelect: (code: string) => void;
}

export function LanguageOptionCard({
  language,
  isSelected,
  onSelect,
}: LanguageOptionCardProps) {
  const accessibilityState: AccessibilityState = { selected: isSelected };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onSelect(language.code)}
      accessibilityRole="radio"
      accessibilityState={accessibilityState}
      accessibilityLabel={`${language.label}, ${language.nativeLabel}`}
    >
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {language.nativeLabel}
      </Text>
      {language.nativeLabel !== language.label && (
        <Text style={[styles.sublabel, isSelected && styles.sublabelSelected]}>
          {language.label}
        </Text>
      )}
      {isSelected && (
        <View style={styles.checkmark} accessibilityElementsHidden>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </Pressable>
  );
}


