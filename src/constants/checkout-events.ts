// Note: The enums in this file is only for `src`. Typescript will also need it added to the `types` directory for usage.
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
  CHECKOUT_UPSELL_CANCELED = 'checkout.upsell.canceled',
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
