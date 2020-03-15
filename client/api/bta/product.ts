import { fetchWrapper, BTA_BASE_URL } from '../api';

interface Timeslot {
  start: string;
  finish: string;
  available: number;
  status: number;
}

interface AvalableDate {
  date: string;
  available_slot_count: number;
  timeslots: Timeslot[];
}

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
