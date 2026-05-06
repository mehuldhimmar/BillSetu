import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { SUPPORTED_LANGUAGES } from '../../shared/constants/languages';
import { useI18n } from '../../shared/i18n/I18nContext';
import { LanguageOptionCard } from './components/LanguageOptionCard';
import { styles } from './LanguageSelectionScreen.styles';

interface LanguageSelectionScreenProps {
  onContinue?: (languageCode: string) => void;
}

export function LanguageSelectionScreen({
  onContinue,
}: LanguageSelectionScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedCode, setSelectedCode] = useState<string>('en');
  const { t } = useI18n();

  const handleContinue = () => {
    onContinue?.(selectedCode);
  };

  return (
    // Root bg = white so status bar area matches the screen background
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} translucent />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Image
              source={require('../../images/language.png')}
              style={styles.globeIcon}
              resizeMode="contain"
              accessibilityElementsHidden
            />
          </View>
          <Text style={styles.title}>{t.languageSelection.title}</Text>
          <Text style={styles.subtitle}>
            {t.languageSelection.subtitle}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Language Options */}
        <View
          style={styles.optionsContainer}
          accessibilityRole="radiogroup"
          accessibilityLabel="Language options"
        >
          {SUPPORTED_LANGUAGES.map(language => (
            <LanguageOptionCard
              key={language.code}
              language={language}
              isSelected={selectedCode === language.code}
              onSelect={setSelectedCode}
            />
          ))}
        </View>
      </ScrollView>

      {/* Continue Button — pinned to bottom, respects nav bar */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continueButtonPressed,
          ]}
          onPress={handleContinue}
          accessibilityRole="button"
          accessibilityLabel={t.languageSelection.continue}
          accessibilityHint="Proceed with the selected language"
        >
          <Text style={styles.continueButtonText}>{t.languageSelection.continue}</Text>
        </Pressable>
      </View>
    </View>
  );
}
