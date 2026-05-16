import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { useI18n } from '../../shared/i18n/I18nContext';
import { DashboardCard } from './components/DashboardCard';
import { styles } from './HomeScreen.styles';

interface HomeScreenProps {
  businessName?: string;
  invoiceCount?: number;
  totalAmount?: number;
  onCreateInvoice?: () => void;
  onGSTCalculator?: () => void;
  onHistory?: () => void;
  onBusinessProfile?: () => void;
  onSettings?: () => void;
}

export function HomeScreen({
  businessName,
  invoiceCount = 0,
  totalAmount = 0,
  onCreateInvoice,
  onGSTCalculator,
  onHistory,
  onBusinessProfile,
  onSettings,
}: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  return (
    // Root bg = primary so the status bar area matches the header colour
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header Bar ── */}
        <View style={styles.headerBar}>
          <Text style={styles.appTitle}>{businessName || 'BillSetu'}</Text>
        </View>

        {/* ── Stats Card ── */}
        <View style={styles.statsCardWrapper}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{invoiceCount}</Text>
              <Text style={styles.statLabel}>{t.home.invoiceHistory}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                ₹{totalAmount.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.statLabel}>{t.invoice.amount}</Text>
            </View>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* Primary CTA */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={onCreateInvoice}
            accessibilityRole="button"
            accessibilityLabel={t.home.createInvoice}
            accessibilityHint="Start creating a new invoice"
          >
            <Image
              source={require('../../images/add.png')}
              style={styles.primaryButtonIcon}
              resizeMode="contain"
              accessibilityElementsHidden
            />
            <Text style={styles.primaryButtonText}>{t.home.createInvoice}</Text>
          </Pressable>

          {/* Quick Actions */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.home.quickActions}</Text>
          </View>

          <View style={styles.grid}>
            <DashboardCard
              image={require('../../images/calculator.png')}
              label={t.home.gstCalculator}
              onPress={onGSTCalculator ?? (() => {})}
            />
            <DashboardCard
              image={require('../../images/history.png')}
              label={t.invoiceHistory.title}
              onPress={onHistory ?? (() => {})}
            />
            <DashboardCard
              image={require('../../images/settings.png')}
              label={t.settings.title}
              onPress={onSettings ?? (() => {})}
            />
            <DashboardCard
              image={require('../../images/profile.png')}
              label={t.businessProfile.title}
              onPress={onBusinessProfile ?? (() => {})}
            />
          </View>

        </View>

      </ScrollView>
    </View>
  );
}
