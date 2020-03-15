// Line item as sent to shopify to be added to a checkout
export interface LineItem {
  variantId: string;
  quantity: number;
}

export interface CheckoutLineItem {
  id: string;
  title: string;
  quantity: number;
}

export interface Checkout {
  id: string;
  lineItems: CheckoutLineItem[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  images: string[];
}

export interface UserError {
  field: string[];
  message: string;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  zip: string;
  company?: string;
}
export interface CustomerInformation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address: Address;
  phone: string;
  customerAccessToken?: string;
  company?: string;
}
