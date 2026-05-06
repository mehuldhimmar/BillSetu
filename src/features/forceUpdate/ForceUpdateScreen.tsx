import React, { useEffect } from 'react';
import {
  BackHandler,
  Linking,
  Pressable,
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
}

export function ForceUpdateScreen({
  storeUrl = PLAY_STORE_URL,
  currentVersion,
  latestVersion,
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

      <View style={styles.container}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚨</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Update Required</Text>

        {/* Description */}
        <Text style={styles.description}>
          A new version of BillSetu is available.{'\n'}
          Please update to continue using the app.
        </Text>

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
    </View>
  );
}
