import { fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const getAllProducts = async () => {
  const API_URL = `${SHOPIFY_BASE_URL}/products`;
  try {
    const response = await fetchWrapper(API_URL);
    const { products } = response.data;
    return { products, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { products: [], error: true };
  }
};
