export const en = {
  // Language Selection
  languageSelection: {
    title: 'Choose Your Language',
    subtitle: 'Please select your preferred language',
    continue: 'Continue',
  },

  // Common
  common: {
    back: 'Back',
    cancel: 'Cancel',
    apply: 'Apply',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },

  // Home / Dashboard
  home: {
    greeting: 'Hello',
    tagline: 'Manage your business with ease',
    createInvoice: 'Create Invoice',
    invoiceHistory: 'Invoice History',
    gstCalculator: 'GST Calculator',
    businessProfile: 'Business Profile',
    settings: 'Settings',
    noBusinessName: 'Set up your business',
  },

  // Settings
  settings: {
    title: 'Settings',
    preferences: 'Preferences',
    language: 'Language',
    invoicePrefix: 'Invoice Prefix',
    about: 'About',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    rateUs: 'Rate Us',
    shareApp: 'Share App',
    version: 'BillSetu v1.0.0',
    selectLanguage: 'Select Language',
    invoicePrefixPlaceholder: 'e.g. INV-',
    invalidPrefix: 'Invalid Prefix',
    invalidPrefixMessage: 'Invoice prefix cannot be empty.',
    errorSave: 'Could not save settings. Please try again.',
    errorLink: 'Could not open the link. Please try again.',
    shareMessage: 'Create professional GST invoices in seconds with BillSetu! Download now: https://billsetu.app',
    shareTitle: 'BillSetu — GST Invoice Maker',
  },

  // Business Profile
  businessProfile: {
    title: 'Business Profile',
    businessName: 'Business Name',
    businessNamePlaceholder: 'Enter business name',
    address: 'Address',
    addressPlaceholder: 'Enter address',
    phone: 'Phone',
    phonePlaceholder: 'Enter phone number',
    email: 'Email',
    emailPlaceholder: 'Enter email address',
    gstin: 'GSTIN',
    gstinPlaceholder: 'Enter GSTIN (optional)',
    saveProfile: 'Save Profile',
    profileSaved: 'Profile saved successfully.',
    errorSave: 'Could not save profile. Please try again.',
    logoHint: 'Tap to add logo',
    changeLogoHint: 'Tap to change logo',
  },

  // Create Invoice
  invoice: {
    createTitle: 'Create Invoice',
    billTo: 'Bill To',
    customerName: 'Customer Name',
    customerNamePlaceholder: 'Enter customer name',
    customerPhone: 'Phone',
    customerPhonePlaceholder: 'Enter phone number',
    customerAddress: 'Address',
    customerAddressPlaceholder: 'Enter address',
    invoiceNumber: 'Invoice Number',
    invoiceDate: 'Invoice Date',
    items: 'Items',
    addItem: 'Add Item',
    itemName: 'Item Name',
    itemNamePlaceholder: 'Enter item name',
    quantity: 'Qty',
    rate: 'Rate',
    gst: 'GST %',
    amount: 'Amount',
    subtotal: 'Subtotal',
    gstAmount: 'GST Amount',
    total: 'Total',
    notes: 'Notes',
    notesPlaceholder: 'Add notes (optional)',
    preview: 'Preview',
    previewInvoice: 'Preview Invoice',
    saveClose: 'Save & Close',
    share: 'Share',
    download: 'Download PDF',
    deleteItem: 'Delete Item',
    confirmDelete: 'Delete this item?',
    errorGenerate: 'Could not generate invoice. Please try again.',
    invoiceSaved: 'Invoice saved.',
    duplicateInvoice: 'Invoice number already exists.',
  },

  // Invoice History
  invoiceHistory: {
    title: 'Invoice History',
    empty: 'No invoices yet',
    emptySubtitle: 'Create your first invoice to get started',
    deleteConfirm: 'Delete Invoice',
    deleteMessage: 'Are you sure you want to delete this invoice?',
    invoiceNumber: 'Invoice #',
    date: 'Date',
    customer: 'Customer',
    amount: 'Amount',
  },

  // GST Calculator
  gstCalculator: {
    title: 'GST Calculator',
    amount: 'Amount',
    amountPlaceholder: 'Enter amount',
    gstRate: 'GST Rate',
    calculate: 'Calculate',
    baseAmount: 'Base Amount',
    gstAmount: 'GST Amount',
    totalAmount: 'Total Amount',
    inclusive: 'GST Inclusive',
    exclusive: 'GST Exclusive',
    reset: 'Reset',
  },

  // Alerts
  alerts: {
    deleteTitle: 'Delete',
    deleteMessage: 'Are you sure you want to delete this?',
    unsavedChanges: 'Unsaved Changes',
    unsavedMessage: 'You have unsaved changes. Are you sure you want to go back?',
    errorTitle: 'Error',
    successTitle: 'Success',
  },

  // No Internet
  noInternet: {
    title: 'No Internet Connection',
    message: 'Please check your Wi-Fi or mobile data and try again.',
    retry: 'Retry',
  },
};

export type Translations = typeof en;
