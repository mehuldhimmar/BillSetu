import React, { useEffect } from 'react';
import {
  BackHandler,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../theme';

const GST_URL = 'https://www.gst.gov.in/';

interface LegalInformationScreenProps {
  onBack: () => void;
}

export function LegalInformationScreen({ onBack }: LegalInformationScreenProps) {
  const insets = useSafeAreaInsets();

  // Handle Android hardware back
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  const handleGSTLink = () => {
    Linking.openURL(GST_URL).catch(() => {
      // silently ignore if device can't open the URL
    });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

      {/* ── Header ── */}
      <View style={styles.headerBar}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
        >
          <Image
            source={require('../../images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
            accessibilityElementsHidden
          />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Legal Information
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* ── Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Disclaimer card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Disclaimer</Text>
          </View>
          <View style={styles.cardDivider} />
          <Text style={styles.bodyText}>
            BillSetu is an independent billing and invoice management application
            and is not affiliated with, endorsed by, or associated with the
            Government of India, GST Council, or any government authority.
          </Text>
        </View>

        {/* Official GST Information card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Official GST Information</Text>
          </View>
          <View style={styles.cardDivider} />
          <Text style={styles.bodyText}>
            For official GST guidelines, rules, and updates, please visit the
            Government of India's GST portal:
          </Text>
          <Pressable
            onPress={handleGSTLink}
            accessibilityRole="link"
            accessibilityLabel="Open official GST portal"
            accessibilityHint="Opens https://www.gst.gov.in/ in your browser"
          >
            {({ pressed }) => (
              <Text style={[styles.link, pressed && styles.linkPressed]}>
                {GST_URL}
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  // ── Header ──────────────────────────────────────────────
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
    width: 30,
  },

  // ── Scroll ───────────────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },

  // ── Card ─────────────────────────────────────────────────
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.1,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  // ── Body ─────────────────────────────────────────────────
  bodyText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text.secondary,
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    textDecorationLine: 'underline',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  linkPressed: {
    opacity: 0.6,
  },
});
