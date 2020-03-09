import { postWrapper, SHOPIFY_BASE_URL } from '../api';

export const createCustomer = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const API_URL = `${SHOPIFY_BASE_URL}/customer/create`;
  const customerInfo = { email, password, firstName, lastName };
  try {
    const response = await postWrapper(API_URL, customerInfo);
    const { userErrors } = response.data;
    return { userErrors, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { userErrors: [], error: true };
  }
};
