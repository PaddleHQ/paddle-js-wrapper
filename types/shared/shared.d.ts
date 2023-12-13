export interface Totals {
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  taxCategory:
    | 'digital-goods'
    | 'ebooks'
    | 'implementation-services'
    | 'professional-services'
    | 'saas'
    | 'software-programming-services'
    | 'standard'
    | 'training-services'
    | 'website-hosting';
  imageUrl: string | null;
  customData: Record<string, unknown> | null;
  status: 'active' | 'archived';
  createdAt: string;
  importMeta: ImportMeta | null;
}

export interface UnitPrice {
  amount: string;
  currencyCode: string;
}

export interface TimePeriod {
  interval: 'day' | 'week' | 'month' | 'year';
  frequency: number;
}

export interface Quantity {
  minimum: number;
  maximum: number;
}

export interface UnitPriceOverride {
  countryCodes: string[];
  unitPrice: UnitPrice;
}

export interface ImportMeta {
  externalId: string | null;
  importedFrom: string;
}

export interface Price {
  id: string;
  productId: string;
  name: string | null;
  description: string;
  billingCycle: TimePeriod | null;
  trialPeriod: TimePeriod | null;
  taxMode: 'account_setting' | 'external' | 'internal';
  unitPrice: UnitPrice;
  unitPriceOverrides: UnitPriceOverride[];
  quantity: Quantity;
  status: 'active' | 'archived';
  customData: Record<string, unknown> | null;
  importMeta: ImportMeta | null;
}

export type AvailablePaymentMethod = 'alipay' | 'apple_pay' | 'bancontact' | 'card' | 'google_pay' | 'ideal' | 'paypal';
