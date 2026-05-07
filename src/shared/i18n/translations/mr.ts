import { Translations } from './en';

export const mr: Translations = {
  // Language Selection
  languageSelection: {
    title: 'तुमची भाषा निवडा',
    subtitle: 'कृपया तुमची पसंतीची भाषा निवडा',
    continue: 'पुढे जा',
  },

  // Common
  common: {
    back: 'मागे',
    cancel: 'रद्द करा',
    apply: 'लागू करा',
    save: 'जतन करा',
    delete: 'हटवा',
    edit: 'संपादित करा',
    close: 'बंद करा',
    ok: 'ठीक आहे',
    yes: 'होय',
    no: 'नाही',
    loading: 'लोड होत आहे...',
    error: 'त्रुटी',
    success: 'यश',
  },

  // Home / Dashboard
  home: {
    greeting: 'नमस्कार',
    tagline: 'तुमचा व्यवसाय सहजपणे व्यवस्थापित करा',
    createInvoice: 'इनव्हॉइस तयार करा',
    invoiceHistory: 'इनव्हॉइस इतिहास',
    gstCalculator: 'GST कॅल्क्युलेटर',
    businessProfile: 'व्यवसाय प्रोफाइल',
    settings: 'सेटिंग्ज',
    noBusinessName: 'तुमचा व्यवसाय सेट करा',
  },

  // Settings
  settings: {
    title: 'सेटिंग्ज',
    preferences: 'प्राधान्ये',
    language: 'भाषा',
    invoicePrefix: 'इनव्हॉइस उपसर्ग',
    about: 'बद्दल',
    privacyPolicy: 'गोपनीयता धोरण',
    termsConditions: 'अटी व शर्ती',
    rateUs: 'आम्हाला रेट करा',
    shareApp: 'ॲप शेअर करा',
    version: 'BillSetu v1.0.0',
    selectLanguage: 'भाषा निवडा',
    invoicePrefixPlaceholder: 'उदा. INV-',
    invalidPrefix: 'अवैध उपसर्ग',
    invalidPrefixMessage: 'इनव्हॉइस उपसर्ग रिकामा असू शकत नाही.',
    errorSave: 'सेटिंग्ज जतन करता आल्या नाहीत. कृपया पुन्हा प्रयत्न करा.',
    errorLink: 'लिंक उघडता आली नाही. कृपया पुन्हा प्रयत्न करा.',
    shareMessage: 'BillSetu सह सेकंदात व्यावसायिक GST इनव्हॉइस तयार करा! आत्ता डाउनलोड करा: https://billsetu.app',
    shareTitle: 'BillSetu — GST इनव्हॉइस मेकर',
  },

  // Business Profile
  businessProfile: {
    title: 'व्यवसाय प्रोफाइल',
    businessName: 'व्यवसायाचे नाव',
    businessNamePlaceholder: 'व्यवसायाचे नाव प्रविष्ट करा',
    address: 'पत्ता',
    addressPlaceholder: 'पत्ता प्रविष्ट करा',
    phone: 'फोन',
    phonePlaceholder: 'फोन नंबर प्रविष्ट करा',
    email: 'ईमेल',
    emailPlaceholder: 'ईमेल पत्ता प्रविष्ट करा',
    gstin: 'GSTIN',
    gstinPlaceholder: 'GSTIN प्रविष्ट करा (पर्यायी)',
    saveProfile: 'प्रोफाइल जतन करा',
    profileSaved: 'प्रोफाइल यशस्वीरित्या जतन केली.',
    errorSave: 'प्रोफाइल जतन करता आली नाही. कृपया पुन्हा प्रयत्न करा.',
    logoHint: 'लोगो जोडण्यासाठी टॅप करा',
    changeLogoHint: 'लोगो बदलण्यासाठी टॅप करा',
  },

  // Create Invoice
  invoice: {
    createTitle: 'इनव्हॉइस तयार करा',
    billTo: 'बिल प्राप्तकर्ता',
    customerName: 'ग्राहकाचे नाव',
    customerNamePlaceholder: 'ग्राहकाचे नाव प्रविष्ट करा',
    customerPhone: 'फोन',
    customerPhonePlaceholder: 'फोन नंबर प्रविष्ट करा',
    customerAddress: 'पत्ता',
    customerAddressPlaceholder: 'पत्ता प्रविष्ट करा',
    invoiceNumber: 'इनव्हॉइस नंबर',
    invoiceDate: 'इनव्हॉइस तारीख',
    items: 'वस्तू',
    addItem: 'वस्तू जोडा',
    itemName: 'वस्तूचे नाव',
    itemNamePlaceholder: 'वस्तूचे नाव प्रविष्ट करा',
    quantity: 'प्रमाण',
    rate: 'दर',
    gst: 'GST %',
    amount: 'रक्कम',
    subtotal: 'उप-एकूण',
    gstAmount: 'GST रक्कम',
    total: 'एकूण',
    notes: 'नोंदी',
    notesPlaceholder: 'नोंदी जोडा (पर्यायी)',
    preview: 'पूर्वावलोकन',
    previewInvoice: 'इनव्हॉइस पूर्वावलोकन',
    saveClose: 'जतन करा आणि बंद करा',
    share: 'शेअर करा',
    download: 'PDF डाउनलोड करा',
    deleteItem: 'वस्तू हटवा',
    confirmDelete: 'ही वस्तू हटवायची?',
    errorGenerate: 'इनव्हॉइस तयार होऊ शकली नाही. कृपया पुन्हा प्रयत्न करा.',
    invoiceSaved: 'इनव्हॉइस जतन केली.',
    duplicateInvoice: 'इनव्हॉइस नंबर आधीच अस्तित्वात आहे.',
  },

  // Invoice History
  invoiceHistory: {
    title: 'इनव्हॉइस इतिहास',
    empty: 'अद्याप कोणतीही इनव्हॉइस नाही',
    emptySubtitle: 'सुरुवात करण्यासाठी तुमची पहिली इनव्हॉइस तयार करा',
    deleteConfirm: 'इनव्हॉइस हटवा',
    deleteMessage: 'तुम्हाला खरोखर ही इनव्हॉइस हटवायची आहे का?',
    invoiceNumber: 'इनव्हॉइस #',
    date: 'तारीख',
    customer: 'ग्राहक',
    amount: 'रक्कम',
  },

  // GST Calculator
  gstCalculator: {
    title: 'GST कॅल्क्युलेटर',
    amount: 'रक्कम',
    amountPlaceholder: 'रक्कम प्रविष्ट करा',
    gstRate: 'GST दर',
    calculate: 'गणना करा',
    baseAmount: 'मूळ रक्कम',
    gstAmount: 'GST रक्कम',
    totalAmount: 'एकूण रक्कम',
    inclusive: 'GST समाविष्ट',
    exclusive: 'GST अतिरिक्त',
    reset: 'रीसेट',
  },

  // Alerts
  alerts: {
    deleteTitle: 'हटवा',
    deleteMessage: 'तुम्हाला खरोखर हे हटवायचे आहे का?',
    unsavedChanges: 'न जतन केलेले बदल',
    unsavedMessage: 'तुमच्याकडे न जतन केलेले बदल आहेत. तुम्हाला मागे जायचे आहे का?',
    errorTitle: 'त्रुटी',
    successTitle: 'यश',
  },

  // No Internet
  noInternet: {
    title: 'इंटरनेट कनेक्शन नाही',
    message: 'कृपया तुमचे Wi-Fi किंवा मोबाइल डेटा तपासा आणि पुन्हा प्रयत्न करा.',
    retry: 'पुन्हा प्रयत्न करा',
  },
};
