import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
import { createBooking } from '../../api/bta/booking';

const ProductPage: NextPage<any> = props => {
  const [product, setProduct] = useState();
  const [availabilityDates, setAvailabilityDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { product } = await getProductByHandle(props.handle);
      setProduct(product);
      getProductAvailability(product.primaryVariantId).then(response => {
        const { dates } = response;
        setAvailabilityDates(dates);
      });
    };
    fetchData();
  }, []);

  const handleCreateBooking = async (start: string, finish: string) => {
    createBooking(product.primaryVariantId, start, finish);
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div>
        <h2>Product: {product.title}</h2>
        <h4>Price: {product.price} </h4>
        <p>Description: {product.description}</p>
      </div>
      <div>
        {availabilityDates.map((date: any, index: number) => {
          return (
            <div key={index}>
              <p>date: {date.date}</p>
              <p>available_slot_count: {date.available_slot_count}</p>
              <button
                onClick={() =>
                  handleCreateBooking(
                    date.timeslots[0].start,
                    date.timeslots[0].finish
                  )
                }
              >
                book this timeslot
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProductPage.getInitialProps = async context => {
  const { handle } = context.query;
  return { handle };
};
export default ProductPage;
