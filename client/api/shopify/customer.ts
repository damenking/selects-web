import { postWrapper, SHOPIFY_BASE_URL } from '../api';
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
  const {
    addressLine1,
    addressLine2,
    city,
    province,
    zip
  } = customerInfo.address;
  const reqObj = {
    firstName,
    lastName,
    phone,
    company,
    address1: addressLine1,
    address2: addressLine2,
    city,
    province,
    zip,
    customerAccessToken
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
