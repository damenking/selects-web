import React, { useState, useEffect } from 'react';
import { getCustomerOrders } from '../../api/shopify/orders';

// import styles from './Orders.module.css';

const Orders: React.FunctionComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const { orders } = await getCustomerOrders(token);
        setOrders(orders);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h4>Orders Page</h4>
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

export default Orders;
