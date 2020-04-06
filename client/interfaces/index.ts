// Line item as sent to BTA to create a reservations
export interface ReservationLineItem {
  external_id: string;
  start: string;
  quantity: string;
}

export interface CustomAttribute {
  key: string;
  value: string;
}

// Line item as sent to shopify to be added to a checkout or
// creating an order
export interface LineItem {
  variant_id?: string;
  variantId?: string;
  quantity: number;
  customAttributes?: CustomAttribute[];
}

export interface CheckoutLineItemVariant {
  id: string;
}

export interface CheckoutLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: CheckoutLineItemVariant;
  customAttributes: CustomAttribute[];
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
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  company?: string;
  country?: string;
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

export interface Timeslot {
  start: string;
  finish: string;
  available: number;
  status: number;
}

export interface AvalableDate {
  date: string;
  available_slot_count: number;
  timeslots: Timeslot[];
}

export interface DrawerOptionsObj {
  elIndex: number;
  options: string[];
}
