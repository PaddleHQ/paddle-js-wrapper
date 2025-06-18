# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Check our main [developer changelog](https://developer.paddle.com/?utm_source=dx&utm_medium=paddle-js-wrapper) for information about changes to the Paddle Billing platform, the Paddle API, and other developer tools.

## 1.4.2 - 2025-06-18

### Added

- Added support for `prePaymentFailure` in `Paddle.Retain.demo()` function.

---


## 1.4.1 - 2025-04-16

### Fixed

- Remove fallback to window.Paddle

---

## 1.4.0 - 2025-03-04

### Added

- Added support for `customData` in `Paddle.Checkout.updateCheckout()` function.

---

## 1.3.3 - 2024-12-11

### Added

- Added support for saved payment methods. See [related changelog](https://developer.paddle.com/changelog/2024/saved-payment-methods?utm_source=dx&utm_medium=paddle-js-wrapper).

---

## 1.3.2 - 2024-11-06

### Fixed

- Add return type to `getPaddleInstance` type definition

---

## 1.3.1 - 2024-10-29

### Fixed

- Fallback to window.Paddle if Billing or Classic cannot be found

---

## 1.3.0 - 2024-10-23

### Added

- Support to include paddle classic concurrently with paddle billing
- Build as UMD to allow script imports
- Added `getPaddleInstance` to fetch classic or billing instance - version can be `classic` or `v1`

---

## 1.2.3 - 2024-10-01

### Fixed

- `Checkout.updateCheckout` `discountId` and `discountCode` can both be `null`.

### Added

- Added `variant` to checkout settings.

---

## 1.2.2 - 2024-09-27

### Fixed

- Updated `customData` checkout type to allow nested objects.

---

## 1.2.1 - 2024-07-29

### Fixed

- Added missing `price_name` property to checkout events callback.

---

## 1.2.0 - 2024-06-06

### Added

- Added a new property(`allowDiscountRemoval`) to restrict users from removing discounts.

---

## 1.1.1 - 2024-05-28

### Fixed

- Added missing type definition for `Paddle.Checkout.updateCheckout` [function](https://developer.paddle.com/paddlejs/methods/paddle-checkout-updatecheckout?utm_source=dx&utm_medium=paddle-js-wrapper).

---

## 1.1.0 - 2024-05-16

### Added

- Added changelog.

---

## 1.0.3 - 2024-03-14

### Changed

- Update type of `currency_code` from `string` to string literal types.

### Added

- Added types support to pass non-catalog prices to `Paddle.TransactionPreview()` function

---

## 1.0.2 - 2024-02-27

### Added

- Added `Paddle.Initialize` function, Functionally it is the same as `Paddle.Setup`.
- Added `Paddle.Update` function to update `pwCustomer` or `eventCallback` after initializing Paddle JS. See [related changelog](https://developer.paddle.com/changelog/2024/paddle-update-paddle-initialize-paddlejs?utm_source=dx&utm_medium=paddle-js-wrapper).
- Added `Paddle.Initialized` flag to help identify if PaddleJS is already initialized.

### Deprecated

- Deprecated `Paddle.Setup` in favour of `Paddle.Initialize` field.

---

## 1.0.1 - 2024-02-20

### Changed

- Removed `early access` warning message from `README.md`

---

## 1.0.0 - 2024-02-20

### Changed

- Updated version to `1.0.0`

---

## 0.5.5 - 2024-01-10

### Changed

- Removed `crossOrigin` header from the injected `script` tag.

---

## 0.5.4 - 2023-12-29

### Changed

- Updated Example in `README.md` to include `quantity`.

---

## 0.5.3 - 2023-12-21

### Added

- Added types support for `Paddle.TransactionPreview()`, see [related changelog](https://developer.paddle.com/changelog/2024/paddle-js-transaction-preview?utm_source=dx&utm_medium=paddle-js-wrapper).
- Added types support for `Paddle.Retain.*` functions, see [related changelog](https://developer.paddle.com/changelog/2023/cancellation-flows-retain?utm_source=dx&utm_medium=paddle-js-wrapper).
- Added types support to accept `allowedPaymentMethods` in `Paddle.Checkout.open()`, see [related changelog](https://developer.paddle.com/changelog/2023/preselect-payment-methods-checkout?utm_source=dx&utm_medium=paddle-js-wrapper).

---

## 0.5.2 - 2023-11-22

### Changed

- Updated Example in `README.md` to use token instead of seller ID.

---

## 0.5.1 - 2023-10-30

> **Breaking changes:** This version includes breaking changes. It is called out below.

### Changed

- **Breaking change:** Changed properties of `Paddle.PricePreview()` from `snake_case` to `camelCase`. This matches JavaScript conventions for field names.

---

## 0.5.0 - 2023-10-23

### Added

- Added support for `Paddle.PricePreview()`, see [related changelog](https://developer.paddle.com/changelog/2023/paddle-js-pricing-pages?utm_source=dx&utm_medium=paddle-js-wrapper).

---

## 0.4.0 - 2023-10-12

### Added

- Initial early access release.
