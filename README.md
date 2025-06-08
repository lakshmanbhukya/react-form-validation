# 📝 React Registration Form (Vite + React Router)

This is a **responsive, validated registration form** built using **React** with **Vite** and **React Router DOM**. It validates fields without third-party libraries and redirects to a success page after form submission.

---

## 🚀 Features

- 📋 Collects user data with fields like:
  - First Name, Last Name
  - Username, Email, Password
  - Phone Number (with country code)
  - Country and City dropdowns
  - PAN & Aadhar Number
- 🔒 Built-in validation:
  - Validates all inputs live (e.g., Aadhar = 12 digits, PAN = valid format)
  - Email, password strength, and more
- 👀 Show/Hide password toggle
- ❌ Displays real-time error messages
- ✅ Disables Submit button until all validations pass
- 🔀 Redirects to a new route `/success` showing submitted data
- 💾 Uses `localStorage` to pass data between pages

---
