# BillSetu – Requirements Document

## 📌 Overview

**BillSetu** is a lightweight, offline-first mobile application designed for small businesses and freelancers in India to:

* Calculate GST
* Generate invoices
* Export and share invoices as PDF

The app focuses on **simplicity, speed, and no-login usage**.

---

## 🎯 Objectives

* Enable users to create invoices in under 10 seconds
* Provide accurate GST calculations (CGST/SGST)
* Work fully offline (no backend required)
* Offer a clean and easy-to-use interface

---

## 👤 Target Users

* Small shop owners
* Freelancers
* Local service providers
* Students (basic billing needs)

---

## 📱 Platform

* React Native (Android first, iOS optional)

---

## 🧩 Core Features

### 1. GST Calculator

* Input amount
* Select GST rate (5%, 12%, 18%, 28%, custom)
* Toggle:

  * Add GST
  * Remove GST
* Display:

  * GST amount
  * Total amount
* Option to use result in invoice

---

### 2. Invoice Creation

* Auto-generated invoice number
* Select date
* Add customer details:

  * Name
  * Phone (optional)

#### Item Entry:

* Item name
* Quantity
* Price
* GST %

#### Calculations:

* Subtotal
* GST breakdown (CGST + SGST)
* Grand total

---

### 3. Invoice Preview

* Display full invoice layout
* Show:

  * Business details
  * Customer details
  * Items table
  * Total amount
* Actions:

  * Edit invoice
  * Generate PDF
  * Share invoice

---

### 4. PDF Generation

* Generate invoice as PDF
* Include:

  * Logo
  * Business info
  * Item table
* Save locally
* Share via:

  * WhatsApp
  * Email
  * Other apps

---

### 5. Invoice History

* Store all invoices locally
* Features:

  * List view
  * Search
  * View details
  * Delete invoice

---

### 6. Business Profile

* Business name
* GST number
* Address
* Phone
* Logo upload

---

### 7. Settings

* Currency (₹ default)
* Invoice prefix (e.g., INV-001)
* Theme (light/dark)
* Backup/restore (local storage)

---

## 💾 Data Storage

* Local database: SQLite / Room
* Store:

  * Invoices
  * Items
  * Business profile

---

## 💰 Monetization

### Free Version:

* Banner ads
* Limited templates

### Pro Version:

* No ads
* Premium templates
* No watermark on PDF
* Backup/restore enabled

---

## 🎨 UI/UX Requirements

* Simple and minimal design
* Large touch-friendly buttons
* Fast navigation
* ₹ currency display
* Minimal typing required

---

## ⚡ Performance Requirements

* App size < 15 MB
* Fast launch time (<2 seconds)
* Smooth scrolling for invoice list

---

## 🔒 Security & Privacy

* No login required
* No cloud sync
* All data stored locally
* Optional app lock (PIN/Fingerprint)

---

## 🧪 Testing Requirements

* Test on low-end Android devices
* Validate GST calculations
* Test PDF generation and sharing
* Ensure offline functionality

---

## 🚀 Future Enhancements (Optional)

* Voice input for items
* Multiple invoice templates
* Export to Excel
* Multi-language support
* Cloud backup (optional)

---

## ⏱️ MVP Scope

Include:

* GST Calculator
* Invoice Creation
* PDF Export
* Local Storage

Exclude:

* Cloud sync
* Advanced analytics
* Inventory management

---

## 📦 Tech Stack

* React Native
* SQLite
* PDF Generator (HTML to PDF)
* AdMob (ads integration)

---

## 📌 App Title (Play Store)

**BillSetu – GST Invoice & Billing App**

---

## 🏁 Conclusion

BillSetu aims to be the **simplest and fastest GST billing app in India**, focusing on usability and offline functionality.
