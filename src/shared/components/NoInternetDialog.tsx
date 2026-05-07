/**
 * NoInternetDialog — full-screen blocking dialog shown whenever the device
 * loses internet connectivity.
 *
 * Uses @react-native-community/netinfo for instant, event-driven detection.
 * Requires a full native rebuild after installing the package:
 *   Android: npx react-native run-android
 *   iOS:     cd ios && pod install && npx react-native run-ios
 *
 * Mount <NoInternetDialog /> once inside the app root (after I18nProvider).
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Colors, Spacing } from '../../theme';
import { useI18n } from '../i18n/I18nContext';

// ── Connectivity helper ───────────────────────────────────────────────────────

function isOnline(state: { isConnected: boolean | null; isInternetReachable: boolean | null }): boolean {
  // isConnected: device has a network interface up
  // isInternetReachable: null means "unknown" (e.g. first event) — treat as online
  //                      false means definitely no internet
  return state.isConnected === true && state.isInternetReachable !== false;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function NoInternetDialog() {
  const { t } = useI18n();
  // Start as online — dialog only appears after the first NetInfo event confirms offline
  const [offline, setOffline] = useState(false);
  const [checking, setChecking] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // ── Subscribe to network changes ──────────────────────────────────────────

  useEffect(() => {
    // addEventListener fires immediately with the current state, then on every change
    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(!isOnline(state));
    });

    return () => unsubscribe();
  }, []);

  // ── Animate in / out ──────────────────────────────────────────────────────

  useEffect(() => {
    if (offline) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 260,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }).start(() => {
        scaleAnim.setValue(0.85);
      });
    }
  }, [offline, scaleAnim, opacityAnim]);

  // ── Manual retry ──────────────────────────────────────────────────────────

  const handleRetry = useCallback(async () => {
    setChecking(true);
    try {
      const state = await NetInfo.fetch();
      setOffline(!isOnline(state));
    } finally {
      setChecking(false);
    }
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  if (!offline) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={offline}
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => {}} // block hardware back button
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />

      {/* Dialog */}
      <View style={styles.centeredView} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.dialog,
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Image
            source={require('../../images/nowifi.png')}
            style={styles.noWifiImage}
            resizeMode="contain"
            accessibilityElementsHidden
          />

          <Text style={styles.title}>{t.noInternet.title}</Text>
          <Text style={styles.message}>{t.noInternet.message}</Text>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
            onPress={handleRetry}
            disabled={checking}
            accessibilityRole="button"
            accessibilityLabel={t.noInternet.retry}
          >
            <Text style={styles.retryText}>
              {checking ? `${t.noInternet.retry}…` : t.noInternet.retry}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  dialog: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.secondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border,
  },
  retryButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonPressed: {
    backgroundColor: Colors.backgroundSecondary,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  noWifiImage: {
    width: 100,
    height: 100,
    marginBottom: Spacing.lg,
  },
});
