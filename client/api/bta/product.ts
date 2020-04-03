import { fetchWrapper, BTA_BASE_URL } from '../api';
import { AvalableDate } from '../../interfaces/';

export const getProductAvailability = async (productId: string) => {
  const API_URL = `${BTA_BASE_URL}/product/${productId}/availability`;
  try {
    const response = await fetchWrapper(API_URL);
    const { dates } = response.data;
    const availableDatesObj: any = {};
    dates.forEach((date: AvalableDate) => {
      const dateObj = new Date(date.date);
      dateObj.setHours(0);
      availableDatesObj[dateObj.toString()] = 1;
    });
    return { dates, availableDatesObj, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { dates: [], availableDatesObj: {}, error: true };
  }
};
