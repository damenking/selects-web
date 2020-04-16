import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { getCustomerOrders } from '../../api/shopify/orders';

const OrderHistoryPage: NextPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const { orders, error } = await getCustomerOrders(token);
        setOrders(orders);
        setError(error);
      } else {
        Router.push('/account/signIn');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <h1>Error loading order history....</h1>;
  }
  return (
    <div>
      <h2>Order History</h2>
      <br />
      {orders.map((order: any, index: number) => {
        return (
          <div key={index}>
            <h5>Order #{order.orderNumber}</h5>
            <div>
              <span>Create at: {order.createdAt}</span>
              {order.lineItems.map((lineItem: any, index: number) => {
                return (
                  <div key={index}>
                    <ul>
                      <li>Product: {lineItem.title}</li>
                      <li>Quantity: {lineItem.quantity}</li>
                      <li>Duration: {lineItem.variant_title}</li>
                      <li>Price: ${lineItem.price}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistoryPage;
