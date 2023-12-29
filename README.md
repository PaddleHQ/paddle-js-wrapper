# Paddle.js module

[Paddle Billing](https://www.paddle.com/billing?utm_source=dx&utm_medium=paddle-js-wrapper) is a complete digital product sales and subscription management platform, designed for modern software businesses. It helps you increase your revenue, retain customers, and scale your operations.

You can use [Paddle.js](https://developer.paddle.com/paddlejs/overview?utm_source=dx&utm_medium=paddle-js-wrapper) to integrate [Paddle Checkout](https://developer.paddle.com/concepts/sell/self-serve-checkout) and [Paddle Retain](https://www.paddle.com/retain?utm_source=dx&utm_medium=paddle-js-wrapper) with your app or website.

This package is a wrapper for Paddle.js that lets you:

- Download and work with Paddle.js
- Use TypeScript definitions when working with Paddle.js functions

> **Important:** This package works for Paddle.js v2, which is part of Paddle Billing. It does not support Paddle Classic. To work with Paddle.js v1, see: [Paddle.js v1 reference](https://developer.paddle.com/classic/reference/ZG9jOjI1MzUzOTg3-paddle-reference?utm_source=dx&utm_medium=paddle-js-wrapper)

## Before you begin

This is a beta release, which means it's ready to rely on but we're actively looking for feedback. If you've used this package, we'd love to hear how you found it! Email us at [team-dx@paddle.com](mailto:team-dx@paddle.com) with any thoughts.

While in beta, we may introduce breaking changes in the future. We'll always tag breaking changes and communicate ahead of time, so you have time to update.

## Installation

Install using `npm`:

```sh
npm install @paddle/paddle-js
```

Install using `yarn`:

```sh
yarn add @paddle/paddle-js
```

Install using `pnpm`:

```sh
pnpm add @paddle/paddle-js
```

## Initialize Paddle.js

Import, then use the `initializePaddle` function to initialize Paddle.js. It downloads Paddle.js from the CDN, then initializes it using the seller ID, environment, and any other settings that you passed.

For security and compliance, you must only load Paddle.js directly from `https://cdn.paddle.com/`. This makes sure that you're running with the latest security and feature updates from Paddle.

> **Note:** `initializePaddle` always downloads the latest version of Paddle.js. Updates to this package are for the loader or TypeScript definitions, and may not be tied to updates for Paddle.js.

## TypeScript definitions

This package includes TypeScript definitions for Paddle.js. The minimum supported version of TypeScript is `4.1`.

For example, `CheckoutOpenOptions` has definitions for all the values you can pass to the [`Paddle.Checkout.open()`](https://developer.paddle.com/paddlejs/methods/paddle-checkout-open?utm_source=dx&utm_medium=paddle-js-wrapper) method in Paddle.js.

## Example

This is a simple React example that shows how to import, initialize, and open a checkout with one item.

```typescript jsx
import { initializePaddle, Paddle } from '@paddle/paddle-js';

export function Checkout() {
  // Create a local state to store Paddle instance
  const [paddle, setPaddle] = useState<Paddle>();

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    initializePaddle({ environment: 'ENVIRONMENT_GOES_HERE', token: 'AUTH_TOKEN_GOES_HERE' }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  // Callback to open a checkout
  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [{ priceId: 'PRICE_ID_GOES_HERE', quantity: 1 }],
    });
  };
}
```

## Learn more

- [Paddle.js reference](https://developer.paddle.com/paddlejs/overview?utm_source=dx&utm_medium=paddle-js-wrapper)
- [Sign up for Paddle Billing](https://login.paddle.com/signup?utm_source=dx&utm_medium=paddle-js-wrapper)
