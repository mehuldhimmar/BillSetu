import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Colors, Spacing } from '../../theme';

interface WebViewScreenProps {
  title: string;
  url: string;
  onBack: () => void;
}

export function WebViewScreen({ title, url, onBack }: WebViewScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle Android hardware back — go back to Settings, not Home
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true; // consume the event
    });
    return () => sub.remove();
  }, [onBack]);

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
          {title}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* ── WebView ── */}
      <View style={styles.body}>
        {error ? (
          <View style={styles.errorWrap}>
            <Text style={styles.errorText}>Unable to load page. Please try again.</Text>
            <Pressable
              style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
              onPress={() => {
                setError(false);
                setLoading(true);
              }}
              accessibilityRole="button"
              accessibilityLabel="Retry"
            >
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <WebView
              source={{ uri: url }}
              style={styles.webView}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              // Keep links inside the WebView — don't open external browser
              setSupportMultipleWindows={false}
              // Inject CSS to match app background and typography
              injectedJavaScript={`
                (function() {
                  var style = document.createElement('style');
                  style.innerHTML = \`
                    body {
                      background-color: #F0F4FC !important;
                      color: #1F2937 !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                      font-size: 15px !important;
                      line-height: 1.7 !important;
                      padding: 16px !important;
                      margin: 0 !important;
                    }
                    pre {
                      white-space: pre-wrap !important;
                      word-break: break-word !important;
                      font-family: inherit !important;
                      margin: 0 !important;
                    }
                    h1 {
                      font-size: 22px !important;
                      font-weight: 700 !important;
                      color: #1F2937 !important;
                      margin-bottom: 4px !important;
                    }
                    h2 {
                      font-size: 17px !important;
                      font-weight: 700 !important;
                      color: #2563EB !important;
                      margin-top: 20px !important;
                      margin-bottom: 4px !important;
                    }
                    h3 {
                      font-size: 15px !important;
                      font-weight: 600 !important;
                      color: #1F2937 !important;
                      margin-top: 12px !important;
                      margin-bottom: 2px !important;
                    }
                    p { margin: 6px 0 !important; }
                    ul, ol { padding-left: 20px !important; margin: 6px 0 !important; }
                    li { margin-bottom: 4px !important; }
                    a { color: #2563EB !important; }
                    hr {
                      border: none !important;
                      border-top: 1px solid #E0E0E0 !important;
                      margin: 16px 0 !important;
                    }
                    table {
                      width: 100% !important;
                      border-collapse: collapse !important;
                      font-size: 13px !important;
                      margin: 8px 0 !important;
                    }
                    th {
                      background-color: #EFF6FF !important;
                      color: #2563EB !important;
                      font-weight: 600 !important;
                      padding: 8px !important;
                      border: 1px solid #E0E0E0 !important;
                      text-align: left !important;
                    }
                    td {
                      padding: 8px !important;
                      border: 1px solid #E0E0E0 !important;
                      vertical-align: top !important;
                    }
                    code {
                      background-color: #EFF6FF !important;
                      color: #2563EB !important;
                      padding: 1px 5px !important;
                      border-radius: 4px !important;
                      font-size: 13px !important;
                    }
                    strong { color: #1F2937 !important; }
                    em { color: #6B7280 !important; }
                  \`;
                  document.head.appendChild(style);
                })();
                true;
              `}
              javaScriptEnabled
              domStorageEnabled={false}
              // Prevent navigating away to external links
              onShouldStartLoadWithRequest={request => request.url === url}
            />
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
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
  body: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  webView: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  errorText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 14,
  },
  retryButtonPressed: {
    backgroundColor: Colors.primaryDark,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
