import { postWrapper, fetchWrapper, SHOPIFY_BASE_URL } from '../api';

export const createToken = async (email: string, password: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/auth/signin`;
  const customerInfo = { email, password };
  try {
    const response = await postWrapper(API_URL, customerInfo);
    const { userErrors, accessToken } = response.data;
    return { userErrors, accessToken, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { userErrors: [], accessToken: '', error: true };
  }
};

export const checkToken = async (token: string | null) => {
  const API_URL = `${SHOPIFY_BASE_URL}/auth/checktoken/?token=${token}`;
  try {
    const response = await fetchWrapper(API_URL);
    const { user, activeToken } = response.data;
    return {
      user,
      activeToken,
      error: response.error
    };
  } catch (e) {
    console.log('caught', e);
    return { user: {}, activeToken: false, error: true };
  }
};

export const renewToken = async (token: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/auth/renewtoken`;
  try {
    const response = await postWrapper(API_URL, { customerAccessToken: token });
    const { renewedToken } = response.data;
    return { renewedToken, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { renewedToken: '', error: true };
  }
};
