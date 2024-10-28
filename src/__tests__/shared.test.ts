import { findScript, getCDNInfoBasedOnVersion, injectScript } from '../utils/shared';
import { Paddle } from '../../types';
import { DefaultVersion } from '../constants/cdn-information';

const PADDLE_JS_SCRIPT = 'script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]';

const mockedPaddleInstance: Paddle = {
  Version: DefaultVersion,
  Status: {
    libraryVersion: '2.0',
  },
  Checkout: {
    close: jest.fn(),
    open: jest.fn(),
    updateItems: jest.fn(),
    updateCheckout: jest.fn(),
  },
  Environment: {
    set: jest.fn(),
  },
  PricePreview: jest.fn(),
  TransactionPreview: jest.fn(),
  Retain: {
    demo: jest.fn(),
    initCancellationFlow: jest.fn(),
  },
  Setup: jest.fn(),
  Spinner: {
    hide: jest.fn(),
    show: jest.fn(),
  },
  Initialized: false,
  Initialize: jest.fn(),
  Update: jest.fn(),
};

interface SharedModule {
  loadFromCDN: (version: string) => Promise<Paddle | undefined>;
}
let sharedModule: SharedModule;
jest.isolateModules(() => {
  sharedModule = require('../utils/shared');
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
    const cdnUrl = getCDNInfoBasedOnVersion(DefaultVersion)?.url as string;
    expect(!!findScript(cdnUrl)).toBe(true);
  });

  test('Should skip Non Paddle Billing scripts', () => {
    const cdnUrl = getCDNInfoBasedOnVersion(DefaultVersion)?.url as string;
    injectScript('https://cdn.paddle.com/paddle/v1/paddle.js');

    expect(!!findScript(cdnUrl)).toBe(false);
  });

  test('Should return paddle instance on load event', async () => {
    window.Paddle = mockedPaddleInstance;
    injectScript('https://cdn.paddle.com/paddle/v2/paddle.js');
    const script = document.querySelector(PADDLE_JS_SCRIPT);
    const promise = sharedModule.loadFromCDN('v1');
    script?.dispatchEvent(new Event('load'));
    return promise.then((paddleInstance) => expect(paddleInstance).toBe(mockedPaddleInstance)).catch(console.warn);
  });

  test('Should reject promise on Error', async () => {
    injectScript('https://cdn.paddle.com/paddle/v2/paddle.js');
    const script = document.querySelector(PADDLE_JS_SCRIPT);
    const promise = sharedModule.loadFromCDN('v1');
    script?.dispatchEvent(new Event('error'));
    return promise.catch((e) => expect(e.message).toBe('Paddle.js not available'));
  });
});
