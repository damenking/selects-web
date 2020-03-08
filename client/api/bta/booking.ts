import { postWrapper, BTA_BASE_URL } from '../api';

export const createBooking = async (
  productId: string,
  startsAt: string,
  finishesAt: string
) => {
  const API_URL = `${BTA_BASE_URL}/booking/create`;
  const bookingInfo = {
    starts_at: startsAt,
    finishes_at: finishesAt,
    items: [
      {
        external_id: productId,
        quantity: '1'
      }
    ],
    customers: [
      {
        first_name: 'Damen',
        last_name: 'K',
        email: 'dk@dk.com'
      }
    ]
  };
  try {
    const response = await postWrapper(API_URL, bookingInfo);
    return { error: false, status: response.status };
  } catch (e) {
    console.log('caught', e);
    return { error: true, status: e.response.status };
  }
};
