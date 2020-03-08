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
    return { error: response.data.error, userErrors: response.data.userErrors };
  } catch (e) {
    console.log('caught', e);
    return { error: true, userErrors: [] };
  }
};
