import { AvailablePaymentMethod, Price, Product, Totals } from '../shared/shared';

export interface PricePreviewItem {
  priceId: string;
  quantity: number;
}

export interface PricePreviewParams {
  items: PricePreviewItem[];
  customerId?: string;
  addressId?: string;
  businessId?: string;
  currencyCode?: string;
  discountId?: string;
  address?: {
    countryCode: string;
    postalCode?: string;
  };
  customerIpAddress?: string;
}

interface Discount {
  id: string;
  status: 'active' | 'archived' | 'expired' | 'used';
  description: string;
  enabledForCheckout: boolean;
  code: string | null;
  type: 'flat' | 'flat_per_seat' | 'percentage';
  amount: string;
  currencyCode: string | null;
  recur: boolean;
  maximumRecurringIntervals: number | null;
  usageLimit: number | null;
  restrictTo: string[] | null;
  expiresAt: string | null;
  timesUsed: number;
  createdAt: string;
  updatedAt: string;
}

interface DiscountLineItem {
  discount: Discount;
  total: string;
  formattedTotal: string;
}

interface LineItem {
  price: Price;
  quantity: number;
  taxRate: string;
  unitTotals: Totals;
  formattedUnitTotals: Totals;
  totals: Totals;
  formattedTotals: Totals;
  product: Product;
  discounts: DiscountLineItem[];
}

export interface PricePreviewResponse {
  data: {
    customerId: string | null;
    addressId: string | null;
    businessId: string | null;
    currencyCode: string;
    address: {
      countryCode: string;
      postalCode: string | null;
    } | null;
    customerIpAddress: string | null;
    discountId: string | null;
    details: {
      lineItems: LineItem[];
    };
    availablePaymentMethods: AvailablePaymentMethod[];
  };
  meta: {
    requestId: string;
  };
}
