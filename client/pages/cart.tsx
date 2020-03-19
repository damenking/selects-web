import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { getCheckout, removeLineItems } from '../api/shopify/checkout';
import UserContext from '../components/UserContext';
import {
  CheckoutLineItem,
  ReservationLineItem,
  CustomAttribute
} from '../interfaces/index';
import { createAndConfirmReservation } from '../api/bta/booking';
import { createOrder } from '../api/shopify/order';

const defaultLineItems: CheckoutLineItem[] = [];

const CartPage: NextPage = () => {
  const { checkoutId, user, updateCheckoutId } = useContext(UserContext);
  const [lineItems, setLineItems] = useState(defaultLineItems);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCheckout(checkoutId);
      setLineItems(response.lineItems);
      setCheckoutUrl(response.checkoutUrl);
      setError(response.error);
    };
    if (checkoutId.length) {
      fetchData();
    }
  }, [checkoutId]);

  const handleRemoveLineItem = async (lineItemId: string) => {
    const response = await removeLineItems(checkoutId, [lineItemId]);
    if (response.error) {
      setError(true);
    } else {
      const updatedLineItems: CheckoutLineItem[] = response.lineItems;
      setLineItems(updatedLineItems);
    }
  };

  const createShopifyOrder = () => {
    const orderLineItems = lineItems.map((lineItem: CheckoutLineItem) => {
      let external_id = '';
      lineItem.customAttributes.forEach((attribute: CustomAttribute) => {
        if (attribute.key === 'external_id') {
          external_id = attribute.value;
        }
      });
      return { variant_id: external_id, quantity: 1 };
    });
    createOrder(user.email, orderLineItems);
  };

  const handleConfirmBooking = async (onAccount: boolean) => {
    const reservationItems: ReservationLineItem[] = [];
    lineItems.forEach(lineItem => {
      let external_id = '';
      let start = '';
      lineItem.customAttributes.forEach((attribute: CustomAttribute) => {
        if (attribute.key === 'external_id') {
          external_id = attribute.value;
        } else if (attribute.key === 'start') {
          start = attribute.value;
        }
      });
      const reservationLineItem: ReservationLineItem = {
        external_id,
        start,
        quantity: '1'
      };
      reservationItems.push(reservationLineItem);
    });
    createAndConfirmReservation(
      checkoutId,
      user.defaultAddress.firstName,
      user.defaultAddress.lastName,
      user.email,
      reservationItems
    );
    if (onAccount) {
      createShopifyOrder();
      updateCheckoutId(user.email, user.defaultAddress);
    } else {
      window.location.href = checkoutUrl;
    }
  };

  if (error) {
    return <h1>There was an error...</h1>;
  }
  return (
    <div>
      {lineItems.map((lineItem: CheckoutLineItem) => {
        return (
          <div key={lineItem.id}>
            <h1>{lineItem.title}</h1>
            <h1>Quantity: {lineItem.quantity}</h1>
            <button onClick={() => handleRemoveLineItem(lineItem.id)}>
              remove item
            </button>
            <hr />
          </div>
        );
      })}
      {!!lineItems.length && !!checkoutUrl.length && (
        <>
          <button onClick={() => handleConfirmBooking(false)}>
            Book and pay
          </button>
          <button onClick={() => handleConfirmBooking(true)}>
            Book and add to account
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
