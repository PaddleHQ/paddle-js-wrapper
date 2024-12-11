import { CountryCode } from './country-code';
import { CurrencyCode } from './currency-code';

export type AvailablePaymentMethod =
  | 'alipay'
  | 'apple_pay'
  | 'bancontact'
  | 'card'
  | 'google_pay'
  | 'ideal'
  | 'paypal'
  | 'saved_payment_methods';

export type Variant = 'multi-page' | 'one-page';

export type TaxMode = 'account_setting' | 'external' | 'internal';

export type Status = 'active' | 'archived';

export type TaxCategory =
  | 'digital-goods'
  | 'ebooks'
  | 'implementation-services'
  | 'professional-services'
  | 'saas'
  | 'software-programming-services'
  | 'standard'
  | 'training-services'
  | 'website-hosting';

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
  taxCategory: TaxCategory;
  imageUrl: string | null;
  customData: Record<string, unknown> | null;
  status: Status;
  createdAt: string;
  importMeta: ImportMeta | null;
}

export interface UnitPrice {
  amount: string;
  currencyCode: CurrencyCode;
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
  countryCodes: CountryCode[];
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
  taxMode: TaxMode;
  unitPrice: UnitPrice;
  unitPriceOverrides: UnitPriceOverride[];
  quantity: Quantity;
  status: Status;
  customData: Record<string, unknown> | null;
  importMeta: ImportMeta | null;
}

export interface NonCatalogProductRequest {
  name: string;
  taxCategory: TaxCategory;
  description?: string | null;
  imageUrl?: string | null;
  customData?: Record<string, unknown>;
}

interface NonCatalogBasePriceRequest {
  name?: string;
  description: string;
  unitPrice: UnitPrice;
  billingCycle?: TimePeriod;
  trialPeriod?: TimePeriod;
  taxMode?: TaxMode;
  unitPriceOverrides?: UnitPriceOverride[];
  quantity?: Quantity;
  customData?: Record<string, unknown>;
}

interface NonCatalogBasePriceRequestWithProductId extends NonCatalogBasePriceRequest {
  productId: string;
  product?: never;
}

interface NonCatalogBasePriceRequestWithProduct extends NonCatalogBasePriceRequest {
  productId?: never;
  product: NonCatalogProductRequest;
}

export type NonCatalogPriceRequest = NonCatalogBasePriceRequestWithProductId | NonCatalogBasePriceRequestWithProduct;
