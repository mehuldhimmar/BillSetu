/**
 * AppAlert — themed in-app alert dialog.
 *
 * Usage (imperative, drop-in for Alert.alert):
 *   import { showAlert } from '../shared/components/AppAlert';
 *
 *   showAlert({ title: 'Saved', message: 'Profile updated.' });
 *
 *   showAlert({
 *     title: 'Delete?',
 *     message: 'This cannot be undone.',
 *     buttons: [
 *       { text: 'Cancel', style: 'cancel' },
 *       { text: 'Delete', style: 'destructive', onPress: () => doDelete() },
 *     ],
 *   });
 *
 * Mount <AppAlertHost /> once at the root of your app (inside SafeAreaProvider).
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Spacing } from '../../theme';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

export interface AlertConfig {
  title: string;
  message?: string;
  buttons?: AlertButton[];
}

// ── Global queue ──────────────────────────────────────────────────────────────

type Listener = (config: AlertConfig) => void;
let _listener: Listener | null = null;

export function showAlert(config: AlertConfig) {
  if (_listener) {
    _listener(config);
  }
}

// ── Host component (mount once at app root) ───────────────────────────────────

export function AppAlertHost() {
  const [config, setConfig] = useState<AlertConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Register listener
  useEffect(() => {
    _listener = (cfg: AlertConfig) => {
      setConfig(cfg);
      setVisible(true);
    };
    return () => { _listener = null; };
  }, []);

  // Animate in when visible
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 260,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);

  const dismiss = useCallback((btn?: AlertButton) => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setConfig(null);
      btn?.onPress?.();
    });
  }, [opacityAnim]);

  if (!config) { return null; }

  const buttons: AlertButton[] =
    config.buttons && config.buttons.length > 0
      ? config.buttons
      : [{ text: 'OK', style: 'default' }];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => {
        const cancelBtn = buttons.find(b => b.style === 'cancel');
        dismiss(cancelBtn);
      }}
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => {
          const cancelBtn = buttons.find(b => b.style === 'cancel');
          dismiss(cancelBtn);
        }} />
      </Animated.View>

      {/* Dialog */}
      <View style={styles.centeredView} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.dialog,
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {/* Title */}
          <Text style={styles.title}>{config.title}</Text>

          {/* Message */}
          {config.message ? (
            <Text style={styles.message}>{config.message}</Text>
          ) : null}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Buttons */}
          <View style={[styles.buttonRow, buttons.length > 2 && styles.buttonColumn]}>
            {buttons.map((btn, idx) => (
              <Pressable
                key={idx}
                style={({ pressed }) => [
                  styles.button,
                  buttons.length === 1 && styles.buttonFull,
                  buttons.length === 2 && styles.buttonHalf,
                  buttons.length > 2 && styles.buttonBlock,
                  btn.style === 'cancel' && styles.buttonCancel,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => dismiss(btn)}
                accessibilityRole="button"
                accessibilityLabel={btn.text}
              >
                <Text
                  style={[
                    styles.buttonText,
                    btn.style === 'cancel' && styles.buttonTextCancel,
                    btn.style === 'destructive' && styles.buttonTextDestructive,
                    btn.style === 'default' && styles.buttonTextDefault,
                  ]}
                >
                  {btn.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  message: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  // Button layout
  buttonRow: {
    flexDirection: 'row',
  },
  buttonColumn: {
    flexDirection: 'column',
  },
  button: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFull: {
    flex: 1,
  },
  buttonHalf: {
    flex: 1,
    borderRightWidth: 0,
  },
  buttonBlock: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  buttonCancel: {
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  buttonPressed: {
    backgroundColor: Colors.backgroundSecondary,
  },

  // Button text variants
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  buttonTextDefault: {
    color: Colors.primary,
  },
  buttonTextCancel: {
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  buttonTextDestructive: {
    color: '#EF4444',
  },
});
