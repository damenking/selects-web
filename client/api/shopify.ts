import { fetchWrapper, postWrapper } from './api';

const BASE_URL = '/api/shopify';

export const getAllProducts = () => {
  const API_URL = `${BASE_URL}/products`;
  try {
    return fetchWrapper(API_URL);
  } catch (e) {
    console.log('caught', e);
    return { data: [], error: true };
  }
};

export const getProductByHandle = async (handle: string | string[]) => {
  const API_URL = `${BASE_URL}/product/${handle}`;
  try {
    const response = await fetchWrapper(API_URL);
    return response;
  } catch (e) {
    console.log('caught', e);
    return { data: {}, error: true };
  }
};

export const createCustomer = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const API_URL = `${BASE_URL}/customer/create`;
  const customerInfo = { email, password, firstName, lastName };
  try {
    const response = await postWrapper(API_URL, customerInfo);
    return { error: response.data.error, userErrors: response.data.userErrors };
  } catch (e) {
    console.log('caught', e);
    return { error: true, userErrors: [] };
  }
};
