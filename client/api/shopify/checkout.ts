import { fetchWrapper, postWrapper, SHOPIFY_BASE_URL } from '../api';
import { LineItem, CheckoutLineItem, Address } from '../../interfaces/index';

export const createCheckout = async (email?: string, address?: Address) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/create`;
  const reqObj = {
    email,
    shippingAddress: address,
  };
  try {
    const response = await postWrapper(API_URL, reqObj);
    const checkoutId: string = response.data.checkoutId;
    return { checkoutId, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { checkoutId: '', error: true };
  }
};

export const getCheckout = async (checkoutId: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/fetch?checkoutId=${checkoutId}`;
  try {
    const response = await fetchWrapper(API_URL);
    const {
      lineItems,
      webUrl,
    }: { lineItems: CheckoutLineItem[]; webUrl: string } = response.data;
    return { checkoutUrl: webUrl, lineItems, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { checkoutUrl: '', lineItems: [], error: true };
  }
};

export const addLineItems = async (
  checkoutId: string,
  lineItems: LineItem[]
) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/addlineitems`;
  const reqObj = {
    checkoutId,
    lineItems,
  };
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true };
  }
};

export const removeLineItems = async (
  checkoutId: string,
  lineItems: string[]
) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/removelineitems`;
  const reqObj = {
    checkoutId,
    lineItems,
  };
  try {
    const response = await postWrapper(API_URL, reqObj);
    const lineItems: CheckoutLineItem[] = response.data.lineItems;
    return { lineItems, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { lineItems: [], error: true };
  }
};

export const deleteCheckout = async (checkoutId: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/delete`;
  const reqObj = { checkoutId };
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true };
  }
};

export const updateCheckoutShippingLine = async (checkoutId: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/updateshippingline`;
  const reqObj = { checkoutId };
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true };
  }
};
