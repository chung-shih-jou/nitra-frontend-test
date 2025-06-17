export interface ILocation {
  id: number;
  name: string;
  taxRate: string;
}

export interface IOrganization {
  id: number;
  name: string;
  totalProcessingFeeFixed: number;
  totalProcessingFeePercentage: string;
}

export interface IPaymentLocationReader {
  id: number;
  label: string;
  readerId: string;
  status: string;
  locationId: number;
}

export enum PaymentLocationReaderStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}
