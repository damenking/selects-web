import { postWrapper, fetchWrapper, SHOPIFY_BASE_URL } from '../api';
import { CustomerInformation, Address } from '../../interfaces/';

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
  address: Address,
  customerAccessToken: string
) => {
  const API_URL = `${SHOPIFY_BASE_URL}/customer/createAddress`;
  const {
    first_name,
    last_name,
    phone,
    company,
    address1,
    address2,
    city,
    province,
    zip,
  } = address;
  const reqObj = {
    first_name,
    last_name,
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

export const updateAddress = async (
  address: Address,
  setDefaultAddress: boolean,
  customerId: string
) => {
  // set default will be used once a customer can add more than one address
  const API_URL = `${SHOPIFY_BASE_URL}/customer/updateAddress`;
  const {
    id,
    first_name,
    last_name,
    phone,
    company,
    address1,
    address2,
    city,
    province,
    zip,
  } = address;
  const reqObj = {
    addressId: id,
    customerId,
    first_name,
    last_name,
    phone,
    company,
    address1,
    address2,
    city,
    province,
    zip,
    setDefaultAddress,
  };
  try {
    const response = await postWrapper(API_URL, reqObj);
    const { address } = response.data;
    return { address, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { address: {}, error: true };
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
    const { user, errors } = response.data;
    return { user, errors, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { user: {}, errors: {}, error: true };
  }
};
