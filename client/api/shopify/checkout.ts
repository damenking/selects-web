import { fetchWrapper, postWrapper, SHOPIFY_BASE_URL } from '../api';
import { LineItem, CheckoutLineItem } from '../../interfaces/index';

export const createCheckout = async () => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/create`;
  try {
    const response = await postWrapper(API_URL, {});
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
    const lineItems: CheckoutLineItem[] = response.data.lineItems;
    return { lineItems, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { lineItems: [], error: true };
  }
};

export const addLineItems = async (
  checkoutId: string,
  lineItems: LineItem[]
) => {
  const API_URL = `${SHOPIFY_BASE_URL}/checkout/addlineitems`;
  const reqObj = {
    checkoutId,
    lineItems
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
    lineItems
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
