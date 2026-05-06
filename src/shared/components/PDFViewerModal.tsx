import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Colors, Spacing } from '../../theme';
import { showAlert } from './AppAlert';

interface PDFViewerModalProps {
  visible: boolean;
  filePath: string;       // absolute path returned by react-native-html-to-pdf
  invoiceNumber: string;
  onClose: () => void;
}

export function PDFViewerModal({
  visible,
  filePath,
  invoiceNumber,
  onClose,
}: PDFViewerModalProps) {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const pdfHeight = screenWidth * 1.4142; // standard A4 aspect ratio

  // file:// URI — works on both Android and iOS for local files
  const fileUri = filePath.startsWith('file://') ? filePath : `file://${filePath}`;

  const source = { uri: fileUri };

  const handleShare = useCallback(async () => {
    try {
      const rawPath = fileUri.replace('file://', '');
      
      // Android FileProvider in react-native-share only exposes the Cache directory.
      // We must copy the PDF from Documents to Cache before sharing it.
      const cachePath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/Invoice_${invoiceNumber}.pdf`;
      await ReactNativeBlobUtil.fs.cp(rawPath, cachePath);

      await Share.open({
        title: `Invoice ${invoiceNumber}`,
        url: `file://${cachePath}`,
        type: 'application/pdf',
        failOnCancel: false,
      });
    } catch (error: any) {
      console.log('Error sharing:', error);
      showAlert({ title: 'Share Error', message: error?.message || String(error) });
    }
  }, [fileUri, invoiceNumber]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.placeholderButton} />

          <Text style={styles.title} numberOfLines={1}>
            {invoiceNumber}
          </Text>

          <Pressable
            style={styles.cancelButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close PDF preview"
          >
            <Text style={styles.cancelText}>Cancel  ✕</Text>
          </Pressable>
        </View>

        {/* PDF Viewer */}
        <ScrollView style={styles.webview} contentContainerStyle={{ alignItems: 'center' }}>
          <Pdf
            source={source}
            style={{ width: screenWidth, height: pdfHeight, backgroundColor: '#FFFFFF' }}
            trustAllCerts={false}
            fitPolicy={0}
            spacing={0}
            renderActivityIndicator={() => (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loaderText}>Loading PDF…</Text>
              </View>
            )}
          />
        </ScrollView>

        {/* Bottom action bar */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <Pressable
            style={({ pressed }) => [styles.footerShare, pressed && styles.footerSharePressed]}
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Share invoice PDF"
          >
            <Image source={require('../../images/share.png')} style={styles.footerShareIcon} resizeMode="contain" accessibilityElementsHidden />
            <Text style={styles.footerShareText}>Share Invoice</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  // Header
  header: {
    height: 56,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  cancelButton: {
    paddingVertical: Spacing.sm,
    paddingLeft: Spacing.sm,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  shareButton: {
    paddingVertical: Spacing.sm,
    paddingLeft: Spacing.sm,
  },
  shareText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  placeholderButton: {
    width: 60, // approximate width of the share button to keep the title centered
  },

  // WebView
  webview: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },

  // Loading overlay
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    gap: Spacing.md,
  },
  loaderText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },

  // Footer
  footer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  footerShare: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  footerSharePressed: {
    backgroundColor: Colors.primaryDark,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  footerShareIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  footerShareText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
