import { postWrapper, fetchWrapper, SHOPIFY_BASE_URL } from '../api';
import { CustomerInformation } from '../../interfaces/';

export const createCustomer = async (customerInfo: CustomerInformation) => {
  const API_URL = `${SHOPIFY_BASE_URL}/customer/create`;
  try {
    const response = await postWrapper(API_URL, customerInfo);
    const { userErrors } = response.data;
    return { userErrors, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { userErrors: [], error: true };
  }
};

export const createAddress = async (
  customerInfo: CustomerInformation,
  customerAccessToken: string
) => {
  const API_URL = `${SHOPIFY_BASE_URL}/customer/createAddress`;
  const { firstName, lastName, phone, company } = customerInfo;
  const { address1, address2, city, province, zip } = customerInfo.address;
  const reqObj = {
    firstName,
    lastName,
    phone,
    company,
    address1,
    address2,
    city,
    province,
    zip,
    customerAccessToken,
  };
  try {
    const response = await postWrapper(API_URL, reqObj);
    const { userErrors } = response.data;
    return { userErrors, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { userErrors: [], error: true };
  }
};

export const updateCustomerFavorites = async (
  customerId: string,
  favoriteIds: string[]
) => {
  // must container customer id in '383838929' format.
  const API_URL = `${SHOPIFY_BASE_URL}/customer/${customerId}/metafields/updatefavorites`;
  const reqObj = { favoriteIds };
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true };
  }
};

export const getCustomerFavorites = async (customerId: string) => {
  const API_URL = `${SHOPIFY_BASE_URL}/customer/${customerId}/metafields/favorites`;
  try {
    const response = await fetchWrapper(API_URL);
    let { favorites } = response.data;
    return { favorites, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { favorites: [], error: true };
  }
};

export const updateCustomer = async (customerId: string, fields: any) => {
  // must container customer id in '383838929' format.
  const API_URL = `${SHOPIFY_BASE_URL}/customer/${customerId}/update`;
  const reqObj = { customer: {} as any };
  reqObj.customer = fields;
  reqObj.customer.id = customerId;
  try {
    const response = await postWrapper(API_URL, reqObj);
    const { user } = response.data;
    return { user, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { user: {}, error: true };
  }
};
