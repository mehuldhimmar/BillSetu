import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { InvoiceData } from '../../features/invoice/CreateInvoiceScreen';
import { BusinessProfile } from './businessProfileStorage';

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(value: number): string {
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function num(value: number): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── HTML template ─────────────────────────────────────────────────────────────

function buildHTML(invoice: InvoiceData, business: BusinessProfile | null): string {
  const itemRows = invoice.items
    .map(
      item => `
      <tr>
        <td>
          <span class="item-name">${item.name}</span>
          ${item.gstRate > 0 ? `<br/><span class="item-gst">GST ${item.gstRate}%</span>` : ''}
        </td>
        <td class="center">${item.quantity}</td>
        <td class="right">${num(item.price)}</td>
        <td class="right bold">${num(item.total)}</td>
      </tr>`,
    )
    .join('');

  const businessName = business?.businessName || 'BillSetu';

  const billFromBlock = business?.businessName
    ? `<p class="bill-name">${business.businessName}</p>
       ${business.address ? `<p class="bill-detail">${business.address}</p>` : ''}
       ${business.phone ? `<p class="bill-detail">${business.phone}</p>` : ''}
       ${business.gstin ? `<p class="bill-detail">GSTIN: ${business.gstin}</p>` : ''}`
    : `<p class="bill-empty">No business profile set up</p>`;

  const billToBlock = invoice.customerName
    ? `<p class="bill-name">${invoice.customerName}</p>
       ${invoice.customerPhone ? `<p class="bill-detail">${invoice.customerPhone}</p>` : ''}`
    : `<p class="bill-empty">No customer specified</p>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 18px; color: #1E293B; background: #fff; }

    /* Header */
    .header { background: linear-gradient(135deg, #2563EB, #5B8CFF); padding: 20px 28px 16px; }
    .header .business-name { font-size: 24px; font-weight: 800; color: #fff; letter-spacing: 0.5px; }
    .header-meta { display: flex; justify-content: space-between; margin-top: 12px;
                   padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.25); }
    .header-meta .meta-block .label { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.65);
                                       text-transform: uppercase; letter-spacing: 0.5px; }
    .header-meta .meta-block .value { font-size: 18px; font-weight: 700; color: #fff; margin-top: 2px; }
    .header-meta .meta-block.right { text-align: right; }

    /* Bill From / Bill To */
    .bill-row { display: flex; border-bottom: 1px solid #E0E0E0; }
    .bill-col { flex: 1; padding: 14px 28px; }
    .bill-col + .bill-col { border-left: 1px solid #E0E0E0; }
    .section-label { font-size: 14px; font-weight: 700; color: #94A3B8; text-transform: uppercase;
                     letter-spacing: 0.6px; margin-bottom: 6px; }
    .bill-name { font-size: 18px; font-weight: 700; color: #1E293B; }
    .bill-detail { font-size: 16px; color: #64748B; margin-top: 2px; }
    .bill-empty { font-size: 16px; color: #94A3B8; font-style: italic; }

    /* Table */
    .table-section { padding: 12px 28px 0; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { border-bottom: 1.5px solid #E0E0E0; }
    thead th { font-size: 15px; font-weight: 700; color: #94A3B8; text-transform: uppercase;
               letter-spacing: 0.5px; padding: 6px 4px; }
    thead th.center { text-align: center; }
    thead th.right { text-align: right; }
    tbody tr { border-bottom: 1px solid #F5F5F5; }
    tbody tr:last-child { border-bottom: none; }
    tbody td { padding: 8px 4px; vertical-align: top; }
    .item-name { font-size: 18px; font-weight: 600; color: #1E293B; }
    .item-gst { font-size: 16px; color: #94A3B8; }
    td.center { text-align: center; font-size: 18px; color: #64748B; }
    td.right { text-align: right; font-size: 18px; color: #64748B; }
    td.right.bold { font-weight: 700; color: #1E293B; }

    /* Totals */
    .totals { background: #FAFAFA; border-top: 1px solid #E0E0E0; padding: 14px 28px; margin-top: 4px; }
    .totals-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .totals-row .label { font-size: 18px; color: #64748B; }
    .totals-row .value { font-size: 18px; font-weight: 600; color: #1E293B; }
    .totals-divider { border: none; border-top: 1px solid #E0E0E0; margin: 8px 0; }
    .totals-final .label { font-size: 21px; font-weight: 800; color: #1E293B; }
    .totals-final .value { font-size: 23px; font-weight: 800; color: #2563EB; }

    /* Footer note */
    .footer-note { text-align: center; font-size: 16px; color: #94A3B8; padding: 14px 28px; }
  </style>
</head>
<body>

  <div class="header">
    <div class="business-name">${businessName}</div>
    <div class="header-meta">
      <div class="meta-block">
        <div class="label">Invoice No.</div>
        <div class="value">${invoice.invoiceNumber}</div>
      </div>
      <div class="meta-block right">
        <div class="label">Date</div>
        <div class="value">${invoice.date}</div>
      </div>
    </div>
  </div>

  <div class="bill-row">
    <div class="bill-col">
      <div class="section-label">Bill From</div>
      ${billFromBlock}
    </div>
    <div class="bill-col">
      <div class="section-label">Bill To</div>
      ${billToBlock}
    </div>
  </div>

  <div class="table-section">
    <table>
      <thead>
        <tr>
          <th style="text-align:left">Item</th>
          <th class="center">Qty</th>
          <th class="right">Price</th>
          <th class="right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>
  </div>

  <div class="totals">
    <div class="totals-row">
      <span class="label">Subtotal</span>
      <span class="value">${fmt(invoice.subtotal)}</span>
    </div>
    <div class="totals-row">
      <span class="label">GST</span>
      <span class="value">${fmt(invoice.totalGST)}</span>
    </div>
    <hr class="totals-divider"/>
    <div class="totals-row totals-final">
      <span class="label">Total</span>
      <span class="value">${fmt(invoice.grandTotal)}</span>
    </div>
  </div>

  <div class="footer-note">Generated by BillSetu</div>

</body>
</html>`;
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface PDFResult {
  filePath: string;
}

/**
 * Generates a PDF for the given invoice and returns the file path.
 * Throws on failure.
 */
export async function generateInvoicePDF(invoice: InvoiceData, business: BusinessProfile | null = null): Promise<PDFResult> {
  const html = buildHTML(invoice, business);

  const result = await RNHTMLtoPDF.convert({
    html,
    fileName: invoice.invoiceNumber.replace(/[^a-zA-Z0-9-]/g, '_'),
    directory: 'Documents',
    base64: false,
  });

  if (!result.filePath) {
    throw new Error('PDF generation failed — no file path returned');
  }

  return { filePath: result.filePath };
}
