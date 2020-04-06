import { fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const getMenuCollectionByHandle = async (handle: string | string[]) => {
  const API_URL = `${SHOPIFY_BASE_URL}/collection/menu/${handle}`;
  try {
    const response = await fetchWrapper(API_URL);
    let { options } = response.data;
    return { options, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { options: [], error: true };
  }
};
