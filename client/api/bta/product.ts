import { fetchWrapper, BTA_BASE_URL } from '../api';
import { AvalableDate } from '../../interfaces/';
import moment from 'moment';

export const getProductAvailability = async (productId: string) => {
  const API_URL = `${BTA_BASE_URL}/product/${productId}/availability`;
  try {
    const response = await fetchWrapper(API_URL);
    const { dates } = response.data;
    const availableDatesObj: any = {};
    dates.forEach((date: AvalableDate) => {
      availableDatesObj[moment(date.date).toDate().toString()] =
        date.timeslots[0].available;
    });
    return { dates, availableDatesObj, error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { dates: [], availableDatesObj: {}, error: true };
  }
};
