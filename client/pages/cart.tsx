import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { getCheckout } from '../api/shopify/checkout';
import UserContext from '../components/UserContext';
import { LineItemReceive } from '../interfaces/index';

const CartPage: NextPage = () => {
  const { checkoutId } = useContext(UserContext);
  const [lineItems, setLineItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCheckout(checkoutId);
      setLineItems(response.lineItems);
      setError(response.error);
    };
    if (checkoutId.length) {
      fetchData();
    }
  }, [checkoutId]);

  if (error) {
    return <h1>ERror loading cart...</h1>;
  }
  return (
    <div>
      {lineItems.map((lineItem: LineItemReceive) => {
        return (
          <div>
            <h1>{lineItem.title}</h1>
            <h1>Quantity: {lineItem.quantity}</h1>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default CartPage;
