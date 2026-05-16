import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
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
import { InvoiceData } from './CreateInvoiceScreen';
import { generateInvoicePDF } from '../../shared/utils/generateInvoicePDF';
import { PDFViewerModal } from '../../shared/components/PDFViewerModal';
import { showAlert } from '../../shared/components/AppAlert';
import { styles } from './InvoicePreviewScreen.styles';
import { BusinessProfile } from '../../shared/utils/businessProfileStorage';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPrice(value: number): string {
  // Compact price for table column (no ₹ prefix, just number)
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * 'create' — opened from Create Invoice flow: shows Edit + Save & Close + Share Invoice
 * 'history' — opened from Invoice History: shows only Share Invoice, back goes to history
 */
type PreviewMode = 'create' | 'history';

interface InvoicePreviewScreenProps {
  invoice: InvoiceData;
  businessProfile?: BusinessProfile | null;
  mode?: PreviewMode;
  onBack?: () => void;
  onEdit?: () => void;
  onSave?: (invoice: InvoiceData) => void;
  onGeneratePDF?: (invoice: InvoiceData) => void;
}

export function InvoicePreviewScreen({
  invoice,
  businessProfile = null,
  mode = 'create',
  onBack,
  onEdit,
  onSave,
  onGeneratePDF,
}: InvoicePreviewScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  // Hardware back → go back to create screen (no save)
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack?.();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  // Save & Close — persists the invoice and goes to dashboard
  const handleSaveAndClose = useCallback(() => {
    onSave?.(invoice);
  }, [onSave, invoice]);

  const handleGeneratePDF = useCallback(async () => {
    if (pdfLoading) { return; }
    setPdfLoading(true);
    try {
      const { filePath } = await generateInvoicePDF(invoice, businessProfile);
      setPdfPath(filePath);
      onGeneratePDF?.(invoice);
    } catch {
      showAlert({ title: t.alerts.errorTitle, message: t.invoice.errorGenerate });
    } finally {
      setPdfLoading(false);
    }
  }, [invoice, pdfLoading, onGeneratePDF, t]);

  // ── Render ────────────────────────────────────────────────

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} translucent />

      {/* Header */}
      <View style={styles.headerBar}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={t.common.back}
        >
          <Image source={require('../../images/back.png')} style={styles.backIcon} resizeMode="contain" accessibilityElementsHidden />
        </Pressable>
        <Text style={styles.headerTitle}>{t.invoice.previewInvoice}</Text>
      </View>

      {/* Scrollable invoice */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.invoiceCard}>

          {/* ── Blue header band ── */}
          <View style={styles.invoiceHeader}>
            <Text style={styles.invoiceSubtitle}>
              {businessProfile?.businessName || 'BillSetu'}
            </Text>
            <View style={styles.invoiceHeaderMeta}>
              <View style={styles.invoiceHeaderMetaBlock}>
                <Text style={styles.invoiceHeaderMetaLabel}>{t.invoiceHistory.invoiceNumber}</Text>
                <Text style={styles.invoiceHeaderMetaValue}>{invoice.invoiceNumber}</Text>
              </View>
              <View style={[styles.invoiceHeaderMetaBlock, { alignItems: 'flex-end' }]}>
                <Text style={styles.invoiceHeaderMetaLabel}>{t.invoiceHistory.date}</Text>
                <Text style={styles.invoiceHeaderMetaValue}>{invoice.date}</Text>
              </View>
            </View>
          </View>

          {/* ── Bill From / Bill To ── */}
          <View style={styles.billRow}>
            {/* Bill From */}
            <View style={styles.billCol}>
              <Text style={styles.billColLabel}>{t.invoice.billFrom}</Text>
              {businessProfile?.businessName ? (
                <>
                  <Text style={styles.billColName}>{businessProfile.businessName}</Text>
                  {!!businessProfile.address && (
                    <Text style={styles.billColDetail}>{businessProfile.address}</Text>
                  )}
                  {!!businessProfile.phone && (
                    <Text style={styles.billColDetail}>{businessProfile.phone}</Text>
                  )}
                  {!!businessProfile.gstin && (
                    <Text style={styles.billColDetail}>GSTIN: {businessProfile.gstin}</Text>
                  )}
                </>
              ) : (
                <Text style={styles.billColEmpty}>{t.invoice.billFromEmpty}</Text>
              )}
            </View>

            {/* Vertical divider */}
            <View style={styles.billColDivider} />

            {/* Bill To */}
            <View style={styles.billCol}>
              <Text style={styles.billColLabel}>{t.invoice.billTo}</Text>
              {invoice.customerName ? (
                <>
                  <Text style={styles.billColName}>{invoice.customerName}</Text>
                  {!!invoice.customerPhone && (
                    <Text style={styles.billColDetail}>{invoice.customerPhone}</Text>
                  )}
                </>
              ) : (
                <Text style={styles.billColEmpty}>{t.invoice.noCustomer}</Text>
              )}
            </View>
          </View>

          <View style={styles.sectionDivider} />

          {/* ── Items table ── */}
          <View style={styles.tableSection}>
            {/* Table header */}
            <View style={styles.tableHeaderRow}>
              <Text style={styles.tableHeaderItem}>{t.invoice.itemName}</Text>
              <Text style={styles.tableHeaderQty}>{t.invoice.quantity}</Text>
              <Text style={styles.tableHeaderPrice}>{t.invoice.rate}</Text>
              <Text style={styles.tableHeaderTotal}>{t.invoice.total}</Text>
            </View>

            {/* Table rows */}
            {invoice.items.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.tableRow,
                  index === invoice.items.length - 1 && styles.tableRowLast,
                ]}
              >
                <View style={styles.tableCellItem}>
                  <Text style={styles.tableCellItemName}>{item.name}</Text>
                  {item.gstRate > 0 && (
                    <Text style={styles.tableCellItemGst}>GST {item.gstRate}%</Text>
                  )}
                </View>
                <Text style={styles.tableCellQty}>{item.quantity}</Text>
                <Text style={styles.tableCellPrice}>{formatPrice(item.price)}</Text>
                <Text style={styles.tableCellTotal}>{formatPrice(item.total)}</Text>
              </View>
            ))}
          </View>

          {/* ── Totals ── */}
          <View style={styles.totalsSection}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>{t.invoice.subtotal}</Text>
              <Text style={styles.totalsValue}>{formatCurrency(invoice.subtotal)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>{t.invoice.gst}</Text>
              <Text style={styles.totalsValue}>{formatCurrency(invoice.totalGST)}</Text>
            </View>
            <View style={styles.totalsDivider} />
            <View style={styles.totalsRow}>
              <Text style={styles.totalsFinalLabel}>{t.invoice.total}</Text>
              <Text style={styles.totalsFinalValue}>{formatCurrency(invoice.grandTotal)}</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Footer actions */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        {/* Create flow: Edit + Save & Close row */}
        {mode === 'create' && (
          <View style={styles.footerRow}>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                pressed && styles.editButtonPressed,
              ]}
              onPress={onEdit}
              accessibilityRole="button"
              accessibilityLabel={t.common.edit}
            >
              <Image source={require('../../images/edit.png')} style={styles.editButtonIcon} resizeMode="contain" accessibilityElementsHidden />
              <Text style={styles.editButtonText}>{t.common.edit}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.pdfButton,
                pressed && styles.pdfButtonPressed,
              ]}
              onPress={handleSaveAndClose}
              accessibilityRole="button"
              accessibilityLabel={t.invoice.saveClose}
            >
              <Image source={require('../../images/save.png')} style={styles.pdfButtonIcon} resizeMode="contain" accessibilityElementsHidden />
              <Text style={styles.pdfButtonText}>{t.invoice.saveClose}</Text>
            </Pressable>
          </View>
        )}

        {/* Share — always visible; generates PDF then opens share sheet */}
        <Pressable
          style={({ pressed }) => [
            styles.shareButton,
            pressed && styles.shareButtonPressed,
            pdfLoading && { opacity: 0.7 },
          ]}
          onPress={handleGeneratePDF}
          disabled={pdfLoading}
          accessibilityRole="button"
          accessibilityLabel={t.invoice.share}
          accessibilityState={{ busy: pdfLoading }}
        >
          {pdfLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 6 }} />
          ) : (
            <Image source={require('../../images/share.png')} style={styles.shareButtonIcon} resizeMode="contain" accessibilityElementsHidden />
          )}
          <Text style={styles.shareButtonText}>
            {pdfLoading ? '...' : t.invoice.share}
          </Text>
        </Pressable>
      </View>

      {/* PDF Viewer Modal — closing after share:
          - create mode → save invoice and go to dashboard
          - history mode → just close the modal (already saved) */}
      {pdfPath && (
        <PDFViewerModal
          visible={!!pdfPath}
          filePath={pdfPath}
          invoiceNumber={invoice.invoiceNumber}
          onClose={() => {
            setPdfPath(null);
            if (mode === 'create') {
              onSave?.(invoice);
            }
          }}
        />
      )}
    </View>
  );
}
