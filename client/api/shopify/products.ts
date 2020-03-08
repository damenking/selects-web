import { fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const getAllProducts = () => {
  const API_URL = `${SHOPIFY_BASE_URL}/products`;
  try {
    return fetchWrapper(API_URL);
  } catch (e) {
    console.log('caught', e);
    return { data: [], error: true };
  }
};
