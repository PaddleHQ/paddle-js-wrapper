import { initializePaddle } from '../index';
import * as shared from '../shared';
import { Paddle } from '../../types';

const mockedPaddleInstance: Paddle = {
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
describe('initializePaddle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should initialize Paddle with Seller ID', async () => {
    jest.spyOn(shared, 'loadFromCDN').mockResolvedValue(Promise.resolve(mockedPaddleInstance));
    const paddle = await initializePaddle({ seller: 1 });
    expect(paddle?.Status.libraryVersion).toBe('2.0');
    expect(paddle?.Initialize).toBeCalledWith({ seller: 1 });
  });

  test('Should initialize Paddle with Token', async () => {
    jest.spyOn(shared, 'loadFromCDN').mockResolvedValue(Promise.resolve(mockedPaddleInstance));
    const paddle = await initializePaddle({ token: 'TOKEN' });
    expect(paddle?.Status.libraryVersion).toBe('2.0');
    expect(paddle?.Initialize).toBeCalledWith({ token: 'TOKEN' });
  });

  test('Should initialize Paddle with Sandbox Environment', async () => {
    jest.spyOn(shared, 'loadFromCDN').mockResolvedValue(Promise.resolve(mockedPaddleInstance));
    const paddle = await initializePaddle({ seller: 1, environment: 'sandbox' });
    expect(paddle?.Environment.set).toBeCalledWith('sandbox');
    expect(paddle?.Initialize).toBeCalledWith({ seller: 1 });
  });

  test('Should call update if Paddle is already initialized', async () => {
    const updatedMockedPaddleInstance = { ...mockedPaddleInstance, Initialized: true };
    jest.spyOn(shared, 'loadFromCDN').mockResolvedValue(Promise.resolve(updatedMockedPaddleInstance));
    const paddle = await initializePaddle({ seller: 1, environment: 'sandbox' });
    expect(paddle?.Environment.set).toBeCalledWith('sandbox');
    expect(paddle?.Initialize).not.toBeCalled();
    expect(paddle?.Update).toBeCalledWith({ seller: 1 });
  });

  test('Should return error when initialization fails', async () => {
    const consoleWarn = jest.spyOn(console, 'warn');
    jest
      .spyOn(shared, 'loadFromCDN')
      // @ts-expect-error - undefined is not a valid value for Initialize
      .mockResolvedValue(Promise.resolve({ ...mockedPaddleInstance, Initialize: undefined }));
    await initializePaddle({ seller: 1, environment: 'sandbox' });
    expect(consoleWarn).toBeCalledTimes(1);
  });

  test("Should return error when PaddleJS can't be downloaded", async () => {
    const consoleWarn = jest.spyOn(console, 'warn');
    jest.spyOn(shared, 'loadFromCDN').mockResolvedValue(Promise.resolve(undefined));
    await initializePaddle({ seller: 1, environment: 'sandbox' });
    expect(consoleWarn).toBeCalledWith('Error Loading Paddle');
  });
});
