# Nitra Payment Processing UI Requirements

It's the Nitra Frontend testing of payment processing, the UI/UX followed by given figma template, and following requirements:

## Demo:

### detail will decribe below:

[desktop demo](https://github.com/chung-shih-jou/nitra-frontend-test/blob/main/desktop-demo.mov)
<video src="https://github.com/chung-shih-jou/nitra-frontend-test/blob/main/desktop-demo.mov" width="100%"/>

[mobile demo](https://github.com/chung-shih-jou/nitra-frontend-test/blob/main/mobile-demo.mov)

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
- Responsive Web Design (RWD)

## Tech Stack:

- Framework (_vue3.3_ with typescript + vite + *quasar*),
- FontAwesome for icons
- English, Chinese i18n support
- Others: Eslint & Prettier

# How to start?

## install node-module:

```bash
npm install
# or
yarn install
```

## run in local mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the result.


# Structure

- router/
    - add layout and component to page route
- provider/
    - the context provider for global variables or method easily be used between components, ex: the language settings
- methods/
    - the pure functions 
- layouts/
    - layout components and used by pages components or global components
- components/
    - frequently used componenets
- pages/
    - connect with router and page components
    - the outline of view and main functions/variables will be easily to understand what page is doing
- i18n/
    - language messages will be used in components
    - followed by [vue-i18n](https://quasar.dev/options/app-internationalization#introduction)
    - current support Chinese and English
- apis/
    - fetch data folder from backend, only support mock data only, you can see data in apis/mock.ts
    - use new Promise to await 1s to pretend getting data
- css/
    - tailwind and quasar variables
    - global css, ex: font or body...
- defines/
    - the constant define in here.
- assets/
    - image/video were put here
    - if wanting to use assets in html or public.html, try use in public folder
