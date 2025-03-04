import {
  CheckoutEventNames,
  CheckoutEventsData,
  CheckoutEventError,
  DisplayMode,
  Theme,
  AvailablePaymentMethod,
  Variant,
} from '../index';
import { CheckoutCustomer } from './customer';

export interface CheckoutSettings {
  displayMode?: DisplayMode;
  theme?: Theme;
  locale?: string;
  allowLogout?: boolean;
  showAddDiscounts?: boolean;
  showAddTaxId?: boolean;
  frameTarget?: string;
  frameStyle?: string;
  frameInitialHeight?: number;
  successUrl?: string;
  allowedPaymentMethods?: AvailablePaymentMethod[];
  allowDiscountRemoval?: boolean;
  variant?: Variant;
}

export interface PaddleSetupPwCustomer {
  id?: string;
  email?: string;
}

interface PaddleSetupBaseOptions {
  pwAuth?: string;
  pwCustomer?: PaddleSetupPwCustomer;
  debug?: boolean;
  eventCallback?: (event: PaddleEventData) => void;
  checkout?: {
    settings: CheckoutSettings;
  };
}

export interface PaddleEventData extends Partial<CheckoutEventError> {
  name?: CheckoutEventNames;
  data?: CheckoutEventsData;
  error?: CheckoutEventError;
  type?: string;
}

interface PaddleSetupOptionsWithSeller extends PaddleSetupBaseOptions {
  seller: number;
  token?: never;
}

interface PaddleSetupOptionsWithToken extends PaddleSetupBaseOptions {
  seller?: never;
  token: string;
}

export type PaddleSetupOptions = PaddleSetupOptionsWithSeller | PaddleSetupOptionsWithToken;

export interface CheckoutLineItem {
  priceId: string;
  quantity: number;
}

export interface CheckoutOpenLineItem {
  priceId: string;
  quantity?: number;
}

interface CheckoutOpenOptionsWithItems {
  items: CheckoutOpenLineItem[];
  transactionId?: never;
}

interface CheckoutOpenOptionsWithTransactionId {
  items?: never;
  transactionId: string;
}
interface CheckoutOpenOptionsWithDiscountId {
  discountCode?: never;
  discountId?: string | null;
}

interface CheckoutOpenOptionsWithDiscountCode {
  discountCode?: string | null;
  discountId?: never;
}

interface CheckoutOpenOptionsWithCustomer {
  customer?: CheckoutCustomer;
  customerAuthToken?: never;
  savedPaymentMethodId?: never;
}

interface CheckoutOpenOptionsWithCustomerAuthToken {
  customer?: never;
  customerAuthToken?: string;
  savedPaymentMethodId?: string;
}

interface CheckoutOpenBaseOptions {
  settings?: CheckoutSettings;
  customData?: Record<string, unknown>;
}

type CheckoutOpenOptionsWithLineItems = CheckoutOpenOptionsWithItems | CheckoutOpenOptionsWithTransactionId;
type CheckoutOpenOptionsWithDiscount = CheckoutOpenOptionsWithDiscountId | CheckoutOpenOptionsWithDiscountCode;
type CheckoutOpenOptionsWithCustomerData = CheckoutOpenOptionsWithCustomer | CheckoutOpenOptionsWithCustomerAuthToken;

export type CheckoutOpenOptions = CheckoutOpenBaseOptions &
  CheckoutOpenOptionsWithLineItems &
  CheckoutOpenOptionsWithDiscount &
  CheckoutOpenOptionsWithCustomerData;

export type CheckoutUpdateOptions = CheckoutOpenOptionsWithDiscount &
  CheckoutOpenOptionsWithCustomerData & {
    items?: CheckoutOpenLineItem[];
    customData?: Record<string, unknown>;
  };
