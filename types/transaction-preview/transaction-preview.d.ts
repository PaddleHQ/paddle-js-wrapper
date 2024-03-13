import { AvailablePaymentMethod, NonCatalogPriceRequest, Price, Product, Totals } from '../shared/shared';
import { CurrencyCode } from '../shared/currency-code';

interface BaseTransactionItemPreview {
  quantity: number;
  includeInTotals?: boolean;
}

interface TransactionItemWithPriceId extends BaseTransactionItemPreview {
  priceId: string;
  price?: never;
}

interface TransactionItemWithPrice extends BaseTransactionItemPreview {
  priceId?: never;
  price: NonCatalogPriceRequest;
}

export type TransactionPreviewItem = TransactionItemWithPriceId | TransactionItemWithPrice;

export interface TransactionPreviewParams {
  items: TransactionPreviewItem[];
  customerId?: string;
  addressId?: string;
  businessId?: string;
  currencyCode?: CurrencyCode;
  discountId?: string;
  address?: {
    countryCode: string;
    postalCode?: string;
  };
  customerIpAddress?: string;
  ignoreTrials?: boolean;
}

interface BillingPeriod {
  startsAt: string;
  endsAt: string;
}

interface Proration {
  rate: string;
  billingPeriod: BillingPeriod;
}

interface TransactionItem {
  price: Price;
  quantity: number;
  includeInTotals: boolean;
  proration: Proration | null;
}

interface TransactionDetailsTaxRate {
  taxRate: string;
  totals: Totals;
}

interface TransactionTotal {
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  credit: string;
  balance: string;
  grandTotal: string;
  fee: string | null;
  earnings: string | null;
  currencyCode: CurrencyCode;
}

interface TransactionLineItems {
  priceId: string;
  quantity: number;
  taxRate: string;
  unitTotals: Totals;
  totals: Totals;
  product: Product;
}

interface TransactionDetails {
  taxRatesUsed: TransactionDetailsTaxRate[];
  totals: TransactionTotal;
  lineItems: TransactionLineItems[];
}

export interface TransactionPreviewResponse {
  data: {
    customerId: string | null;
    addressId: string | null;
    businessId: string | null;
    currencyCode: CurrencyCode;
    address: {
      countryCode: string;
      postalCode: string | null;
    } | null;
    customerIpAddress: string | null;
    discountId: string | null;
    ignoreTrials: boolean;
    items: TransactionItem[];
    details: TransactionDetails;
    availablePaymentMethods: AvailablePaymentMethod[];
  };
  meta: {
    requestId: string;
  };
}
