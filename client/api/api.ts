import axios from 'axios';

export const BTA_BASE_URL = '/api/bta';
export const SHOPIFY_BASE_URL = '/api/shopify';

export const fetchWrapper = async (url: string) => {
  const { data } = await axios.get(url);
  return { data: data.data, error: data.error };
};

export const postWrapper = async (url: string, body: any) => {
  return axios.post(url, body);
};
