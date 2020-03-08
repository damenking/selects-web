import { postWrapper, fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const signIn = async (email: string, password: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/auth/signin`;
  const customerInfo = { email, password };
  try {
    const response = await postWrapper(API_URL, customerInfo);
    const { error, userErrors, accessToken } = response.data;
    return { error, userErrors, accessToken };
  } catch (e) {
    console.log('caught', e);
    return { error: true, userErrors: [], accessToken: '' };
  }
};

export const checkToken = async (email: string, token: string | null) => {
  console.log('checking token!');
  const API_URL = `${SHOPIFY_BASE_URL}/auth/checktoken/?email=${email}&token=${token}`;
  try {
    const response = await fetchWrapper(API_URL);
    console.log(response);
    return response;
  } catch (e) {
    console.log('caught', e);
    return { data: {}, error: true };
  }
};
