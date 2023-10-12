import { loadFromCDN } from './shared';
import { InitializePaddleOptions, Paddle } from '../types';

export {
  CheckoutEventNames,
  CheckoutEventsPaymentMethodCardTypes,
  CheckoutEventsStatus,
  CheckoutEventsTimePeriodInterval,
  CheckoutEventsPaymentMethodTypes,
} from './enums/checkout-events';

export async function initializePaddle(options?: InitializePaddleOptions): Promise<Paddle | undefined> {
  const paddle = await loadFromCDN();
  if (paddle) {
    if (options) {
      const { environment, ...rest } = options;
      try {
        if (environment) {
          paddle.Environment.set(environment);
        }
        paddle.Setup({
          ...rest,
        });
      } catch (e) {
        console.warn('Paddle Initialization failed. Please check the inputs', e);
      }
    }
    return paddle;
  } else {
    console.warn('Error Loading Paddle');
    return;
  }
}
