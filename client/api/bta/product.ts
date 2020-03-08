import { fetchWrapper, BTA_BASE_URL } from '../api';

export const getProductAvailability = async (productId: string) => {
  const API_URL = `${BTA_BASE_URL}/product/availability/${productId}`;
  try {
    const response = await fetchWrapper(API_URL);
    return response;
  } catch (e) {
    console.log('caught', e);
    return { data: [], error: true, status: e.response.status };
  }
};
