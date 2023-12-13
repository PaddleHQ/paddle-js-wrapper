import {
  CheckoutLineItem,
  CheckoutOpenLineItem,
  CheckoutOpenOptions,
  PaddleSetupOptions,
  CheckoutSettings,
  PaddleEventData,
} from './checkout/checkout';
import { CheckoutCustomer, CheckoutCustomerAddress, CheckoutCustomerBusiness } from './checkout/customer';
import { PricePreviewItem, PricePreviewParams, PricePreviewResponse } from './price-preview/price-preview';
import {
  RetainCancellationFlowAttributeProps,
  RetainCancellationFlowResult,
  RetainDemoAttributeProps,
} from './checkout/retain';
import {
  TransactionPreviewParams,
  TransactionPreviewResponse,
  TransactionPreviewItem,
} from './transaction-preview/transaction-preview';
import { Totals, AvailablePaymentMethod } from './shared/shared';

export {
  CheckoutEventNames,
  CheckoutEventsCustomer,
  CheckoutEventsItem,
  CheckoutEventsPayment,
  CheckoutEventsPaymentMethodDetails,
  CheckoutEventsPaymentMethodCardDetails,
  CheckoutEventsPaymentMethodTypes,
  CheckoutEventsCustomerAddress,
  CheckoutEventsCustomerBusiness,
  CheckoutEventsData,
  CheckoutEventsPaymentMethodCardTypes,
  CheckoutEventsDiscount,
  CheckoutEventsItemProduct,
  CheckoutEventsSettings,
  CheckoutEventsStatus,
  CheckoutEventsTimePeriod,
  CheckoutEventsTimePeriodInterval,
  CheckoutEventsTotals,
  CheckoutEventError,
} from './checkout/events';

export type DisplayMode = 'inline' | 'overlay';
export type Environments = 'production' | 'sandbox';
export type Theme = 'light' | 'dark';

export {
  AvailablePaymentMethod,
  CheckoutOpenOptions,
  PaddleSetupOptions,
  CheckoutLineItem,
  CheckoutOpenLineItem,
  CheckoutSettings,
  PaddleEventData,
  CheckoutCustomer,
  CheckoutCustomerAddress,
  CheckoutCustomerBusiness,
  PricePreviewItem,
  PricePreviewParams,
  PricePreviewResponse,
  RetainCancellationFlowAttributeProps,
  RetainCancellationFlowResult,
  RetainDemoAttributeProps,
  Totals,
  TransactionPreviewItem,
  TransactionPreviewParams,
  TransactionPreviewResponse,
};

export interface Paddle {
  Checkout: {
    open(input: CheckoutOpenOptions): void;
    updateItems(items: CheckoutLineItem[]): void;
    close(): void;
  };
  Environment: {
    set(environment: Environments): void;
  };
  Retain: {
    demo: (parameters: RetainDemoAttributeProps) => void;
    initCancellationFlow: (parameters: RetainCancellationFlowAttributeProps) => Promise<RetainCancellationFlowResult>;
  };
  PricePreview: (params: PricePreviewParams) => Promise<PricePreviewResponse>;
  TransactionPreview: (params: TransactionPreviewParams) => Promise<TransactionPreviewResponse>;
  Setup(options: PaddleSetupOptions): void;
  Spinner: {
    show(): void;
    hide(): void;
  };
  Status: {
    libraryVersion: string;
  };
}

declare global {
  interface Window {
    // Paddle.JS will be downloaded directly from our CDN and added to global variable
    Paddle?: Paddle;
  }
}

export type InitializePaddleOptions = PaddleSetupOptions & {
  environment?: Environments;
};

export function initializePaddle(options?: InitializePaddleOptions): Promise<Paddle | undefined>;
