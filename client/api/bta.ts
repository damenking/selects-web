import { fetchWrapper, postWrapper } from './api';

const BASE_URL = '/api/bta';

export const getProductAvailability = async (productId: string) => {
  const API_URL = `${BASE_URL}/product/availability/${productId}`;
  try {
    const response = await fetchWrapper(API_URL);
    return response;
  } catch (e) {
    console.log('caught', e);
    return { data: [], error: true, status: e.response.status };
  }
};

export const createBooking = async (
  productId: string,
  startsAt: string,
  finishesAt: string
) => {
  const API_URL = `${BASE_URL}/booking/new`;
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
