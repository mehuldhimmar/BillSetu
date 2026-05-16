import React, { useEffect } from 'react';
import {
  BackHandler,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { styles } from './ForceUpdateScreen.styles';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.billsetu';

interface ForceUpdateScreenProps {
  storeUrl?: string;
  currentVersion?: string;
  latestVersion?: string;
  /** Changelog bullet points fetched from Remote Config */
  whatsNew?: string[];
}

export function ForceUpdateScreen({
  storeUrl = PLAY_STORE_URL,
  currentVersion,
  latestVersion,
  whatsNew = [],
}: ForceUpdateScreenProps) {
  const insets = useSafeAreaInsets();

  // Disable Android back button
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => subscription.remove();
  }, []);

  const handleUpdate = async () => {
    const canOpen = await Linking.canOpenURL(storeUrl);
    if (canOpen) {
      await Linking.openURL(storeUrl);
    }
  };

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} translucent />

      <ScrollView
        contentContainerStyle={styles.outerScroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top section — icon + title + description */}
        <View style={styles.topSection}>
          {/* Update image */}
          <View style={styles.updateImageContainer}>
            <Image
              source={require('../../images/update.png')}
              style={styles.updateImage}
              resizeMode="contain"
              accessibilityElementsHidden
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Update Required</Text>

          {/* Description */}
          <Text style={styles.description}>
            A new version of BillSetu is available.{'\n'}
            Please update to continue using the app.
          </Text>
        </View>

        {/* What's New — capped height with internal scroll */}
        {whatsNew.length > 0 && (
          <View style={styles.whatsNewContainer}>
            <Text style={styles.whatsNewTitle}>What's New</Text>
            <ScrollView
              style={styles.whatsNewScroll}
              showsVerticalScrollIndicator={true}
              bounces={false}
              nestedScrollEnabled={true}
            >
              {whatsNew.map((item, index) => (
                <View key={index} style={styles.whatsNewRow}>
                  <Text style={styles.whatsNewBullet}>•</Text>
                  <Text style={styles.whatsNewItem}>{item}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Bottom section — always visible */}
        <View style={styles.bottomSection}>
          <View style={styles.divider} />

          {/* Update Button */}
          <Pressable
            style={({ pressed }) => [
              styles.updateButton,
              pressed && styles.updateButtonPressed,
            ]}
            onPress={handleUpdate}
            accessibilityRole="button"
            accessibilityLabel="Update Now"
            accessibilityHint="Opens the app store to update BillSetu"
          >
            <Text style={styles.updateButtonText}>Update Now</Text>
          </Pressable>

          {/* Version info */}
          {currentVersion && latestVersion && (
            <Text style={styles.versionText}>
              Current: v{currentVersion} → Latest: v{latestVersion}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
