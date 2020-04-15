import { postWrapper, BTA_BASE_URL } from '../api';
import { ReservationLineItem } from '../../interfaces/';

export const createBooking = async (
  productId: string,
  startsAt: string,
  finishesAt: string
) => {
  const API_URL = `${BTA_BASE_URL}/booking/create`;
  const reqObj = {
    starts_at: startsAt,
    finishes_at: finishesAt,
    items: [
      {
        external_id: productId,
        quantity: '1',
      },
    ],
    customers: [
      {
        first_name: 'Damen',
        last_name: 'K',
        email: 'dk@dk.com',
      },
    ],
  };
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true, status: e.response.status };
  }
};

export const createAndConfirmReservation = async (
  checkoutId: string,
  firstName: string,
  lastName: string,
  email: string,
  reservationLineItems: ReservationLineItem[]
) => {
  const API_URL = `${BTA_BASE_URL}/booking/reservation/createandconfirm`;
  const reqObj = {
    cartToken: checkoutId,
    firstName,
    lastName,
    email,
    reservationLineItems,
  };
  // reservationLineItems[0].external_id = '32618861920387';
  try {
    const response = await postWrapper(API_URL, reqObj);
    return { error: response.error };
  } catch (e) {
    console.log('caught', e);
    return { error: true, status: e.response.status };
  }
};
