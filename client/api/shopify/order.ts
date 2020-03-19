import { postWrapper, SHOPIFY_BASE_URL } from '../api';
import { LineItem } from '../../interfaces/';

export const createOrder = async (email: string, lineItems: LineItem[]) => {
  const API_URL = `${SHOPIFY_BASE_URL}/order/create`;
  const reqObj = { email, lineItems };
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true };
  }
};
