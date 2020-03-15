import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { getCheckout, removeLineItems } from '../api/shopify/checkout';
import UserContext from '../components/UserContext';
import { CheckoutLineItem } from '../interfaces/index';

const defaultLineItems: CheckoutLineItem[] = [];

const CartPage: NextPage = () => {
  const { checkoutId } = useContext(UserContext);
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
        <a href={checkoutUrl}>
          <button>Checkout!</button>
        </a>
      )}
    </div>
  );
};

export default CartPage;
