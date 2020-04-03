import { fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const getCustomerOrders = async (accessToken: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/orders/?token=${accessToken}`;
  try {
    const response = await fetchWrapper(API_URL);
    const { orders } = response.data;
    return { orders, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { orders: [], returns: [], error: true };
  }
};
