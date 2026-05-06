# BillSetu – UI Design Document

## 🎯 Design Principles

* Simple & minimal UI
* Large touch-friendly buttons
* Fast navigation
* ₹ currency visibility
* One primary action per screen

---

## 📱 1. First Launch – Language Selection

```
--------------------------------
🌍 Choose Your Language

Please select your preferred language

--------------------------------

[ English ]
[ हिन्दी ]
[ ગુજરાતી ]
[ मराठी ]

--------------------------------

[ Continue ]
--------------------------------
```

### Behavior:

* Show only on first launch
* Save selection locally
* Load app in selected language

---

## 🚨 2. Force Update Screen

```
--------------------------------
🚨 Update Required

A new version of BillSetu is available.
Please update to continue using the app.

--------------------------------

[ Update Now ]
--------------------------------
```

### Behavior:

* Block entire app
* Disable back button
* Redirect to Play Store

---

## 🏠 3. Home Screen (Dashboard)

```
--------------------------------
👋 Welcome

[ ➕ Create Invoice ]  (Primary CTA)

--------------------------------

[ 🧮 GST Calculator ]   [ 📂 History ]

[ 👤 Business Profile ] [ ⚙️ Settings ]

--------------------------------
```

---

## 🧮 4. GST Calculator Screen

```
--------------------------------
← GST Calculator

Amount
[ ₹ 0.00 ]

GST %
[ 5% | 12% | 18% | 28% | Custom ]

[ + Add GST ]   [ - Remove GST ]

--------------------------------
GST Amount:   ₹ 90
Total:        ₹ 590
--------------------------------

[ Use in Invoice ]
--------------------------------
```

---

## 🧾 5. Create Invoice Screen

```
--------------------------------
← Create Invoice

Customer Name
[ Enter name ]

Phone (optional)
[ Enter number ]

--------------------------------
Items
--------------------------------

[ + Add Item ]

--------------------------------
Item 1   Qty 2 × ₹100   GST 18%
--------------------------------

Subtotal: ₹200
GST:      ₹36
Total:    ₹236
--------------------------------

[ Preview Invoice ]
--------------------------------
```

---

## ➕ 6. Add Item (Bottom Sheet / Modal)

```
--------------------------------
Item Name
[ e.g. Rice ]

Quantity
[ 1 ]

Price
[ ₹ 0 ]

GST %
[ 5% | 12% | 18% | 28% ]

--------------------------------

[ Save Item ]
--------------------------------
```

---

## 📄 7. Invoice Preview Screen

```
--------------------------------
← Preview Invoice

[ LOGO ]

Business Name
GSTIN: XXXXX

--------------------------------
Bill To:
Customer Name

--------------------------------
Item     Qty   Price   Total
--------------------------------
Rice      2    100     200
--------------------------------

Subtotal: ₹200
GST:      ₹36
Total:    ₹236
--------------------------------

[ ✏️ Edit ]   [ 📄 Generate PDF ]

[ 📲 Share ]
--------------------------------
```

---

## 📂 8. Invoice History Screen

```
--------------------------------
← Invoice History

🔍 Search...

--------------------------------
INV-001   ₹500   18 Apr
INV-002   ₹1200  17 Apr
--------------------------------

Tap → View

(⋮) → Delete / Share
--------------------------------
```

---

## 👤 9. Business Profile Screen

```
--------------------------------
← Business Profile

Business Name
[ My Shop ]

GST Number
[ XXXXX ]

Phone
[ XXXXX ]

Address
[ XXXXX ]

[ Upload Logo ]

--------------------------------

[ Save ]
--------------------------------
```

---

## ⚙️ 10. Settings Screen

```
--------------------------------
← Settings

Language
[ English > ]

Currency
[ ₹ INR ]

Invoice Prefix
[ INV- ]

Theme
[ Light | Dark ]

--------------------------------

Backup Data
Restore Data

--------------------------------

[ Upgrade to Pro 🚀 ]
--------------------------------
```

---

## 🌍 11. Change Language (Modal)

```
--------------------------------
Select Language

[ English ]
[ हिन्दी ]
[ ગુજરાતી ]
[ मराठी ]

--------------------------------

[ Apply ]
--------------------------------
```

---

## 🎨 UI Style Guide

### Colors:

* Primary: #2E7D32 (Green)
* Secondary: #1565C0 (Blue)
* Background: #FFFFFF / #F5F5F5

---

### Typography:

* Titles: Bold
* Amounts: Large & prominent
* Labels: Medium

---

### Components:

* Buttons: Rounded, large
* Inputs: Simple bordered fields
* Cards: Light shadow

---

## ⚡ UX Enhancements

* Auto-focus input fields
* Instant GST calculation
* Remember last used items
* One-tap PDF sharing
* Smooth list scrolling

---

## 📱 MVP Screens (Priority Build)

1. Language Selection
2. Home
3. GST Calculator
4. Create Invoice
5. Preview
6. PDF Export

---

## 🏁 Conclusion

The UI is designed to ensure:

* Fast invoice creation
* Ease of use for non-technical users
* Clean and distraction-free experience

BillSetu should feel:
👉 “Simple, fast, and reliable”
