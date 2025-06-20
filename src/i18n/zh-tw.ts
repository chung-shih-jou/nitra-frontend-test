export default {
  header: {
    TITLE: '收款',
    RESET_PAYMENT: '重置',
  },
  editProcessingFeeModal: {
    TITLE: '編輯商家手續費',
    DESCRIPTION: '僅適用於此交易',
    MERCHANT_PROCESSING_FEE: '商家手續費',
    PATIENT_PROCESSING_FEE: '患者手續費',
    SET_TO_DEFAULT: '將患者手續費設置為 0',
    SUMMARY: '在這 ${total} 的交易中，您支付 ${merchantFee}，患者支付 ${patientFee}',
  },
  paymentSummary: {
    TITLE: '總結',
    TOTAL: '總計',
    EDIT: '編輯',
    PAY_BY_CARD_FEE: '手續費',
    PAY_BY_CASH_TOTAL: '現金支付總額',
    PAY_BY_CARD_TOTAL: '卡片支付總額',
    PAY_BY_CASH: '現金支付',
    PAY_BY_CARD: '卡片支付',
    SUBTOTAL: '小計',
    TAX: '稅金',
    LOG_PAYMENT: '記錄付款',
    PAY_BY_READER: '在讀卡器上啟動付款',
    PAY_MANUAL: '手動輸入卡號',
    WARNING_MINIMUM: '*總金額低於所需的最低金額 ${min}',
    DEVICE_READER: '設備讀卡器',
  },
  view: {
    REQUIRED: '必填',
    ENGLISH: '英文',
    CHINESE: '中文',
    COUNTRY: '國家',
    PAY_MONEY: '支付 ${amount}',
    UPDATE: '更新',
    CANCEL: '取消',
    PROCESS_PAYMENT: '處理付款',
    ENTER_AMOUNT: '輸入金額',
    DESCRIPTION_OPTIONAL: '描述（選填）',
  },
  readerPaymentModal: {
    TITLE: '與患者確認詳情',
    DESCRIPTION: '在設備讀卡器上與客戶確認此交易的詳情。如果一切看起來都很好，請繼續處理付款。',
    PROCESS_PAYMENT: '自動處理中 {time} 秒',
    HINT: '或點擊下面的“處理付款”',
  },
  creditCardForm: {
    TITLE: '信用卡詳情',
    FULL_NAME: '卡片持有人姓名',
    CARD_NUMBER: '卡號',
    CVC: 'CVC',
    ZIP_CODE: '郵政編碼',
    EXPIRE_DATE: '到期日',
  },
};
