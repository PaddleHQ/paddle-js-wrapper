interface CheckoutCustomerId {
  id: string;
  email?: never;
}

interface CheckoutCustomerEmail {
  id?: never;
  email: string;
}

interface CheckoutCustomerAddressId {
  id: string;
  countryCode?: never;
  postalCode?: never;
  region?: never;
  city?: never;
  firstLine?: never;
}

interface CheckoutCustomerAddressDetails {
  id?: never;
  countryCode?: string;
  postalCode?: string;
  region?: string;
  city?: string;
  firstLine?: string;
}

interface CheckoutCustomerBusinessId {
  id: string;
  name?: never;
  taxIdentifier?: never;
}

interface CheckoutCustomerBusinessDetails {
  id?: never;
  name: string;
  taxIdentifier: string;
}

type CheckoutCustomerUserInfo = CheckoutCustomerId | CheckoutCustomerEmail;

export type CheckoutCustomerAddress = CheckoutCustomerAddressId | CheckoutCustomerAddressDetails;
export type CheckoutCustomerBusiness = CheckoutCustomerBusinessId | CheckoutCustomerBusinessDetails;

interface CheckoutCustomerDetails {
  address?: CheckoutCustomerAddress;
  business?: CheckoutCustomerBusiness;
}

export type CheckoutCustomer = CheckoutCustomerUserInfo & CheckoutCustomerDetails;
