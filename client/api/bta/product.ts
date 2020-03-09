import { fetchWrapper, BTA_BASE_URL } from '../api';

export const getProductAvailability = async (productId: string) => {
  const API_URL = `${BTA_BASE_URL}/product/availability/${productId}`;
  try {
    const response = await fetchWrapper(API_URL);
    const { dates } = response.data;
    return { dates, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { dates: [], error: true };
  }
};
