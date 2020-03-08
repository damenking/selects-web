import { fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const getProductByHandle = async (handle: string | string[]) => {
  const API_URL = `${SHOPIFY_BASE_URL}/product/${handle}`;
  try {
    const response = await fetchWrapper(API_URL);
    return response;
  } catch (e) {
    console.log('caught', e);
    return { data: {}, error: true };
  }
};
