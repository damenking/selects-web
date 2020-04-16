import { fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const getAllProducts = async () => {
  // not currently used
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

export const searchProducts = async (searchTerm: string | string[]) => {
  // searches by title and tags
  const API_URL = `${SHOPIFY_BASE_URL}/products/search?searchTerm=${searchTerm}`;
  try {
    const response = await fetchWrapper(API_URL);
    const { products } = response.data;
    return { products, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { products: [], error: true };
  }
};

export const getProductsByIds = async (productIds: string[]) => {
  const API_URL = `${SHOPIFY_BASE_URL}/products/byIds?ids=${productIds.join(
    ','
  )}`;
  try {
    const response = await fetchWrapper(API_URL);
    const { products } = response.data;
    return { products, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { products: [], error: true };
  }
};
