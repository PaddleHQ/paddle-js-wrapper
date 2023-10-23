import { findScript, injectScript } from '../shared';
import { Paddle } from '../../types';

const PADDLE_JS_SCRIPT = 'script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]';

const mockedPaddleInstance: Paddle = {
  Status: {
    libraryVersion: '2.0',
  },
  Checkout: {
    close: jest.fn(),
    open: jest.fn(),
    updateItems: jest.fn(),
  },
  Environment: {
    set: jest.fn(),
  },
  PricePreview: jest.fn(),
  Setup: jest.fn(),
  Spinner: {
    hide: jest.fn(),
    show: jest.fn(),
  },
};

interface SharedModule {
  loadFromCDN: () => Promise<Paddle | undefined>;
}
let sharedModule: SharedModule;
jest.isolateModules(() => {
  sharedModule = require('../shared');
});

describe('Shared module', () => {
  afterEach(() => {
    const script = document.querySelector(PADDLE_JS_SCRIPT);
    if (script && script.parentElement) {
      script.parentElement.removeChild(script);
    }
    delete window.Paddle;

    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('Should detect downloaded script', () => {
    injectScript('https://pw.paddle.com/pw.js');
    injectScript('https://cdn.paddle.com/paddle/v2/paddle.js');

    expect(!!findScript()).toBe(true);
  });

  test('Should skip Non Paddle Billing scripts', () => {
    injectScript('https://cdn.paddle.com/paddle/v1/paddle.js');

    expect(!!findScript()).toBe(false);
  });

  test('Should return paddle instance on load event', async () => {
    window.Paddle = mockedPaddleInstance;
    injectScript('https://cdn.paddle.com/paddle/v2/paddle.js');
    const script = document.querySelector(PADDLE_JS_SCRIPT);
    const promise = sharedModule.loadFromCDN();
    script?.dispatchEvent(new Event('load'));
    return promise.then((paddleInstance) => expect(paddleInstance).toBe(mockedPaddleInstance)).catch(console.warn);
  });

  test('Should reject promise on Error', async () => {
    injectScript('https://cdn.paddle.com/paddle/v2/paddle.js');
    const script = document.querySelector(PADDLE_JS_SCRIPT);
    const promise = sharedModule.loadFromCDN();
    script?.dispatchEvent(new Event('error'));
    return promise.catch((e) => expect(e.message).toBe('Failed to load Paddle.js'));
  });
});
