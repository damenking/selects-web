// Line item as sent to BTA to create a reservations
export interface ReservationLineItem {
  external_id: string;
  start: string;
  finish: string;
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
  image: {
    src: string;
  };
  price: string;
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

export interface PreviewImageEdge {
  node: {
    previewImage: {
      originalSrc: string;
      transformedSrc: string;
    };
  };
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage: {
    originalSrc: string;
    transformedSrc: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  media: {
    edges: PreviewImageEdge[];
  };
  variantStorefrontIds: string[];
  variantIds: string[];
  descriptionHtml: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
}

export interface ProductEdge {
  node: Product;
}

export interface UserError {
  field: string[];
  message: string;
  code: string;
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
  address?: Address;
  phone: string;
  customerAccessToken?: string;
  company?: string;
}

export interface ShippingAddressInformation {
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

export interface Image {
  originalSrc: string;
  transformedSrc: string;
}
export interface ImageEdge {
  node: Image;
}

// https://shopify.dev/docs/admin-api/rest/reference/metafield
export interface Metafield {
  key: string;
  value: any;
  value_type: string;
  namespace: string;
}

export interface ProductFavorite {
  id: string;
  image: {
    src: string;
  };
  handle: string;
  title: string;
  variants: ProductVariant[];
}

export interface User {
  id: string;
  email: string;
  accepts_marketing: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  orders_count: number;
  total_spent: string;
  last_order_id: number;
  note: string;
  verified_email: boolean;
  tax_exempt: boolean;
  phone: string;
  tags: string;
  last_order_name: string;
  currency: string;
  addresses: Address[];
  accepts_marketing_updated_at: string;
  marketing_opt_in_level?: any;
  tax_exemptions?: any[];
  default_address: Address | undefined;
}
