import axios from 'axios';

export const fetchWrapper = async (url: string) => {
  const { data } = await axios.get(url);
  return { data: data.data, error: data.error };
};

export const postWrapper = async (url: string, body: any) => {
  return axios.post(url, body);
};
