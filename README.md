# Nitra Payment Processing UI Requirements

It's the Nitra Frontend testing of payment processing, the UI/UX followed by given figma template, and following requirements:

## Functional Requirements:

- Currency: USD
- Location-based
- Users can switch between different locations.
- The payment tax rate should update accordingly based on the selected location.
- The reader options should update accordingly based on the selected location.
- Payment Methods
- Cash Payment
- No processing fee will be applied.
- Card Payment
- In the “Edit Merchant Processing Fee” dialog, the total processing fee is calculated as: totalProcessingFee = totalProcessingFeeFixed + (totalProcessingFeePercentage \* payment amount)
- The merchant and patient share the processing fee. Users can configure the fixed and percentage-based fees for each party in the dialog.
- The total processing fee should dynamically update based on the entered payment amount.
- Users can choose a non-offline payment reader to process the payment.
- Patients can manually enter their card details for payment processing.
- Nice to have: Responsive Web Design (RWD)

## Tech Stack:

- Framework (_vue3.3_ with typescript + vite + quasar),
- FontAwesome for icons
- Nice to have: i18n support (English only for now)
- Others: Eslint & Prettier
