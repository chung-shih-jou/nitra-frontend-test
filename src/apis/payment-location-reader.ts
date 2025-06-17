import { paymentLocationReaders } from './mock';

export const getPaymentLocationReaders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paymentLocationReaders);
    }, 1000);
  });
};
