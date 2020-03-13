import React, { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
// import { createBooking } from '../../api/bta/booking';
import { addLineItems } from '../../api/shopify/checkout';
import UserContext from '../../components/UserContext';

const defaultProduct = {
  primaryVariantId: '',
  title: '',
  primaryVariantPrice: '',
  description: '',
  primaryVariantStorefrontId: ''
};

const ProductPage: NextPage<any> = props => {
  const { checkoutId } = useContext(UserContext);
  const [product, setProduct] = useState(defaultProduct);
  const [loading, setLoading] = useState(true);
  const [availabilityDates, setAvailabilityDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { product } = await getProductByHandle(props.handle);
      setProduct(product);
      getProductAvailability(product.primaryVariantId).then(response => {
        const { dates } = response;
        setAvailabilityDates(dates);
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreateBooking = async (start: string, finish: string) => {
    console.log(start, finish);
    // createBooking(product.primaryVariantId, start, finish);
    addLineItems(checkoutId, [
      { variantId: product.primaryVariantStorefrontId, quantity: 1 }
    ]);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div>
        <h2>Product: {product.title}</h2>
        <h4>Price: {product.primaryVariantPrice} </h4>
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
