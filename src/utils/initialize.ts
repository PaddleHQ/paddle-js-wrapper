import { InitializePaddleOptions, Paddle } from '../../types';

export function initializePaddleBillingV1(options: InitializePaddleOptions, paddle: Paddle) {
  const { environment, version: _version, ...rest } = options;
  try {
    if (environment) {
      paddle.Environment.set(environment);
    }
    if (paddle.Initialized) {
      paddle.Update({ ...rest });
    } else {
      paddle.Initialize({ ...rest });
    }
  } catch (e) {
    console.warn('[Paddle] Paddle Initialization failed. Please check the inputs', e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initializePaddleClassic(options: InitializePaddleOptions, paddle: any) {
  const { environment, version: _version, ...rest } = options;
  try {
    if (environment) {
      paddle.Environment.set(environment);
    }
    paddle.Setup({ ...rest });
  } catch (e) {
    console.warn('[Paddle] Paddle Initialization failed. Please check the inputs', e);
  }
}
