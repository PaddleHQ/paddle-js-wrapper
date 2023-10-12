// Note: The enums in this file is only for types. For it to work in the application please update the `src` directory
export enum CheckoutEventNames {
  CHECKOUT_LOADED = 'checkout.loaded',
  CHECKOUT_CLOSED = 'checkout.closed',
  CHECKOUT_UPDATED = 'checkout.updated',
  CHECKOUT_COMPLETED = 'checkout.completed',
  CHECKOUT_ERROR = 'checkout.error',
  CHECKOUT_FAILED = 'checkout.failed',
  CHECKOUT_ITEMS_UPDATED = 'checkout.items.updated',
  CHECKOUT_ITEMS_REMOVED = 'checkout.items.removed',
  CHECKOUT_CUSTOMER_CREATED = 'checkout.customer.created',
  CHECKOUT_CUSTOMER_UPDATED = 'checkout.customer.updated',
  CHECKOUT_CUSTOMER_REMOVED = 'checkout.customer.removed',
  CHECKOUT_PAYMENT_SELECTED = 'checkout.payment.selected',
  CHECKOUT_PAYMENT_INITIATED = 'checkout.payment.initiated',
  CHECKOUT_PAYMENT_FAILED = 'checkout.payment.failed',
  CHECKOUT_DISCOUNT_APPLIED = 'checkout.discount.applied',
  CHECKOUT_DISCOUNT_REMOVED = 'checkout.discount.removed',
}

export enum CheckoutEventsTimePeriodInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum CheckoutEventsPaymentMethodTypes {
  ALIPAY = 'alipay',
  APPLE_PAY = 'apple-pay',
  CARD = 'card',
  GOOGLE_PAY = 'google-pay',
  IDEAL = 'ideal',
  PAYPAL = 'paypal',
  WIRE_TRANSFER = 'wire-transfer',
  NONE = 'none',
}

export enum CheckoutEventsPaymentMethodCardTypes {
  AMERICAN_EXPRESS = 'american_express',
  DINERS_CLUB = 'diners_club',
  DISCOVER = 'discover',
  JCB = 'jcb',
  MADA = 'mada',
  MAESTRO = 'maestro',
  MASTER_CARD = 'mastercard',
  UNION_PAY = 'union_pay',
  VISA = 'visa',
  UNKNOWN = 'unknown',
}

export enum CheckoutEventsStatus {
  DRAFT = 'draft',
  READY = 'ready',
  COMPLETED = 'completed',
  BILLED = 'billed',
  canceled = 'canceled',
  PAST_DUE = 'past_due',
}

export interface CheckoutEventsCustomerAddress {
  city: string;
  country_code: string;
  first_line: string;
  id: string;
  postal_code: string;
  region: string;
}

export interface CheckoutEventsCustomerBusiness {
  id: string;
  name: string;
  tax_identifier: string;
}

export interface CheckoutEventsCustomer {
  address?: CheckoutEventsCustomerAddress | null;
  business?: CheckoutEventsCustomerBusiness | null;
  email?: string;
  id?: string;
}

export interface CheckoutEventsItemProduct {
  description?: string;
  id: string;
  image_url?: string;
  name: string;
}

export interface CheckoutEventsTimePeriod {
  frequency: number;
  interval: CheckoutEventsTimePeriodInterval;
}

export interface CheckoutEventsTotals {
  balance?: number;
  credit?: number;
  discount: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface CheckoutEventsItem {
  billing_cycle?: CheckoutEventsTimePeriod;
  price_id: string;
  product: CheckoutEventsItemProduct;
  quantity: number;
  recurring_totals?: CheckoutEventsTotals;
  totals: CheckoutEventsTotals;
  trial_period?: CheckoutEventsTimePeriod;
}

export interface CheckoutEventsPaymentMethodCardDetails {
  expiry_month: number;
  expiry_year: number;
  last4: string;
  type: CheckoutEventsPaymentMethodCardTypes;
}

export interface CheckoutEventsPaymentMethodDetails {
  card?: CheckoutEventsPaymentMethodCardDetails;
  type: CheckoutEventsPaymentMethodTypes;
}

export interface CheckoutEventsPayment {
  method_details: CheckoutEventsPaymentMethodDetails;
}

export interface CheckoutEventsSettings {
  display_mode: 'overlay' | 'inline' | 'wide-overlay';
  theme: 'light' | 'dark';
}

export interface CheckoutEventsDiscount {
  code: string;
  id: string;
}

export interface CheckoutEventsData {
  currency_code: string;
  custom_data?: object | null;
  customer: CheckoutEventsCustomer;
  discount?: CheckoutEventsDiscount;
  id: string;
  items: CheckoutEventsItem[];
  payment: CheckoutEventsPayment;
  recurring_totals?: CheckoutEventsTotals;
  settings: CheckoutEventsSettings;
  status: CheckoutEventsStatus;
  totals: CheckoutEventsTotals;
  transaction_id: string;
}

export interface CheckoutEventError {
  type: string;
  code: string;
  detail: string;
  documentation_url: string;
}
