import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
import { createBooking } from '../../api/bta/booking';
import { checkToken } from '../../api/shopify/auth';

const ProductPage: NextPage<any> = props => {
  const [product, setProduct] = useState();
  const [availabilityDates, setAvailabilityDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getProductByHandle(props.handle);
      setProduct(data);
      getProductAvailability(data.primaryVariantId).then(response => {
        setAvailabilityDates(response.data);
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
    <Layout title={'Product pAge'}>
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
    </Layout>
  );
};

ProductPage.getInitialProps = async context => {
  const test = await checkToken(
    'damen@damen.com',
    localStorage.getItem('userToken')
    // localStorage.getItem('userToken')
  );
  console.log(test);
  const { handle } = context.query;
  return { handle };
};
export default ProductPage;
