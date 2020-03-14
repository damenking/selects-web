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
