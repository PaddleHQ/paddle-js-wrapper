import { loadFromCDN } from './utils/shared';
import { InitializePaddleOptions, Paddle, Version } from '../types';
import { DefaultVersion, Versions } from './constants/cdn-information';
import { initializePaddleBillingV1, initializePaddleClassic } from './utils/initialize';

export {
  CheckoutEventNames,
  CheckoutEventsPaymentMethodCardTypes,
  CheckoutEventsStatus,
  CheckoutEventsTimePeriodInterval,
  CheckoutEventsPaymentMethodTypes,
} from './constants/checkout-events';

export async function initializePaddle(options?: InitializePaddleOptions): Promise<Paddle | undefined> {
  const requestedVersion = options?.version || DefaultVersion;
  const paddle = await loadFromCDN(requestedVersion);
  if (paddle) {
    if (options) {
      if (requestedVersion === Versions.V1) {
        initializePaddleBillingV1(options, paddle);
      } else if (requestedVersion === Versions.CLASSIC) {
        initializePaddleClassic(options, paddle);
      }
    }
    return paddle;
  } else {
    console.error('[Paddle] Error Loading Paddle');
    return;
  }
}

export function getPaddleInstance(version: Version = DefaultVersion) {
  if (version === Versions.V1) {
    return (window.PaddleBillingV1 || window.Paddle) as Paddle;
  } else if (version === Versions.CLASSIC) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window.PaddleClassic || window.Paddle) as any;
  } else {
    console.error('[Paddle] Unknown Paddle Version');
    return;
  }
}
