# Privacy Policy

**App Name:** BillSetu  
**Effective Date:** May 6, 2026  
**Last Updated:** May 6, 2026

---

## 1. Introduction

Welcome to **BillSetu**, a GST invoice generation and management app designed for small businesses, freelancers, and service providers in India. We are committed to protecting your privacy. This Privacy Policy explains what information BillSetu collects, how it is used, and your rights regarding that information.

By using BillSetu, you agree to the practices described in this policy.

---

## 2. Information We Collect

BillSetu is an **offline-first application**. All data you enter is stored exclusively on your device. We do not operate any servers, databases, or cloud infrastructure that receives or stores your personal information.

### 2.1 Information You Provide

The following data is entered by you and stored locally on your device only:

**Business Profile**
- Business name
- GSTIN (Goods and Services Tax Identification Number)
- Phone number
- Business address
- Business logo (stored as a local file reference on your device)

**Invoice Data**
- Invoice number and date
- Customer name and phone number
- Line items (product/service name, quantity, unit price, applicable GST rate)
- Calculated totals (subtotal, GST amount, grand total)

**App Settings**
- Preferred language (English, Hindi, Gujarati, or Marathi)
- Currency preference
- Invoice number prefix
- Theme preference (light or dark)

### 2.2 Information We Do NOT Collect

- We do **not** collect any personal data on our servers.
- We do **not** use analytics tools (e.g., Firebase Analytics, Mixpanel, or similar).
- We do **not** use crash reporting services (e.g., Sentry, Crashlytics).
- We do **not** track your usage, behavior, or activity within the app.
- We do **not** require you to create an account or log in.
- We do **not** sync your data to any cloud service.

---

## 3. How We Use Your Information

Since all data remains on your device, it is used solely to provide the app's core functionality:

- Generating and displaying GST-compliant invoices
- Pre-filling your business details on new invoices
- Maintaining a history of your saved invoices
- Applying your preferred language, currency, and theme settings
- Calculating GST amounts using the built-in GST calculator

---

## 4. Data Storage and Security

All app data is stored locally on your device using **AsyncStorage**, a standard React Native local storage mechanism. No data is transmitted to or stored on external servers.

**Important considerations:**
- Your data is tied to the device on which BillSetu is installed. It is not backed up to the cloud by BillSetu.
- If you uninstall the app, all locally stored data (business profile, invoice history, settings) will be permanently deleted.
- If you lose or replace your device, your BillSetu data cannot be recovered by us.
- The security of locally stored data depends on your device's own security features (e.g., screen lock, device encryption).

We recommend keeping your device secure and enabling device-level encryption to protect your business data.

---

## 5. Permissions

BillSetu requests the following device permissions solely to enable specific features:

### Android
| Permission | Purpose |
|---|---|
| `INTERNET` | Required by the operating system's native share sheet to share invoices via email, messaging apps, or other services |
| `READ_MEDIA_IMAGES` (Android 13+) | Allows you to select a photo from your gallery to use as your business logo |
| `READ_EXTERNAL_STORAGE` (Android 12 and below) | Legacy equivalent of the above for older Android versions |

### iOS
| Permission | Purpose |
|---|---|
| Photo Library Access (`NSPhotoLibraryUsageDescription`) | Allows you to select a photo from your photo library to use as your business logo |

These permissions are used **only** for the stated purposes. We do not access your photos, files, or media for any other reason.

---

## 6. Sharing of Information

BillSetu does **not** share your data with any third parties.

When you use the **Share Invoice** feature, your invoice is shared directly through your device's native share sheet (e.g., WhatsApp, email, SMS). This sharing is initiated entirely by you and is handled by your device's operating system. BillSetu does not intercept, store, or transmit the shared content.

---

## 7. Third-Party Libraries

BillSetu uses the following open-source libraries to deliver its features. These libraries operate locally on your device and do not independently collect or transmit your data:

| Library | Purpose |
|---|---|
| `@react-native-async-storage/async-storage` | Local data persistence |
| `react-native-image-picker` | Selecting a business logo from your photo library |
| `react-native-html-to-pdf` | Generating invoice PDF files |
| `react-native-pdf` | Viewing generated PDF invoices |
| `react-native-blob-util` | Local file system operations |
| `react-native-share` | Sharing invoices via the native OS share sheet |
| `react-native-webview` | Rendering invoice previews |

None of these libraries are configured to send data to external servers in the context of BillSetu.

---

## 8. Children's Privacy

BillSetu is intended for use by adults operating businesses. It is not directed at children under the age of 13. We do not knowingly collect any personal information from children. If you believe a child has provided personal information through the app, please contact us so we can address the situation.

---

## 9. Your Rights and Choices

Since all data is stored locally on your device, you have full control over it at all times:

- **Access:** You can view all your data directly within the app (Business Profile, Invoice History, Settings).
- **Edit:** You can update your business profile and settings at any time from within the app.
- **Delete:** You can delete individual invoices from Invoice History. Uninstalling the app removes all stored data permanently.
- **Data Portability:** You can share or export individual invoices as PDF files using the Share feature.

---

## 10. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in the app's features or applicable laws. When we do, we will update the **Last Updated** date at the top of this document. We encourage you to review this policy periodically.

Continued use of BillSetu after any changes constitutes your acceptance of the updated policy.

---

## 11. Contact Us

If you have any questions, concerns, or feedback about this Privacy Policy or BillSetu's data practices, please contact us at:

**Email:** [Meikraapps@gmail.com]  
**App:** BillSetu  

---

*This privacy policy was last updated on May 6, 2026.*
