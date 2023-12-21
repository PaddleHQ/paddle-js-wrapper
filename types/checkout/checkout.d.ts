import {
  CheckoutEventNames,
  CheckoutEventsData,
  CheckoutEventError,
  DisplayMode,
  Theme,
  AvailablePaymentMethod,
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
}

interface PaddleSetupBaseOptions {
  pwAuth?: string;
  pwCustomer?: {
    id?: string;
    email?: string;
  };
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
  discountId?: string;
}

interface CheckoutOpenOptionsWithDiscountCode {
  discountCode?: string;
  discountId?: never;
}

interface CheckoutOpenBaseOptions {
  settings?: CheckoutSettings;
  customer?: CheckoutCustomer;
  customData?: Record<string, string | number | boolean>;
}

type CheckoutOpenOptionsWithLineItems = CheckoutOpenOptionsWithItems | CheckoutOpenOptionsWithTransactionId;
type CheckoutOpenOptionsWithDiscount = CheckoutOpenOptionsWithDiscountId | CheckoutOpenOptionsWithDiscountCode;

export type CheckoutOpenOptions = CheckoutOpenBaseOptions &
  CheckoutOpenOptionsWithLineItems &
  CheckoutOpenOptionsWithDiscount;
