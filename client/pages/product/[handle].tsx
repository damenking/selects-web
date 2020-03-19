import React, { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
import { addLineItems } from '../../api/shopify/checkout';
import UserContext from '../../components/UserContext';
import DatePicker from '../../components/DatePicker';
import { getRentalEndDate } from '../../util/time';

const defaultProduct = {
  primaryVariantId: '',
  title: '',
  primaryVariantPrice: '',
  description: '',
  primaryVariantStorefrontId: '',
  variantIds: [],
  variantStorefrontIds: [],
  variantPrices: []
};

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { checkoutId } = useContext(UserContext);
  const [product, setProduct] = useState(defaultProduct);
  const [loading, setLoading] = useState(true);
  const [availableDatesObj, updateavailableDatesObj] = useState({});
  const [selectedVariantIndex, updateSelectedVariantIndex] = useState(0);
  const [selectedStartDate, updatedSelectedStartDate] = useState('');

  useEffect(() => {
    if (handle) {
      const fetchData = async () => {
        const { product } = await getProductByHandle(handle);
        setProduct(product);
        getProductAvailability(product.variantIds[0]).then(response => {
          const { availableDatesObj } = response;
          updateavailableDatesObj(availableDatesObj);
        });
        setLoading(false);
      };
      fetchData();
    }
  }, [handle]);

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        getProductAvailability(product.variantIds[selectedVariantIndex]).then(
          response => {
            const { availableDatesObj } = response;
            updateavailableDatesObj(availableDatesObj);
          }
        );
      };
      fetchData();
    }
  }, [selectedVariantIndex]);

  const handleAddToCheckout = async () => {
    addLineItems(checkoutId, [
      {
        variantId: product.variantStorefrontIds[selectedVariantIndex],
        quantity: 1,
        customAttributes: [
          { key: 'start', value: selectedStartDate },
          {
            key: 'external_id',
            value: product.variantIds[selectedVariantIndex]
          }
        ]
      }
    ]);
  };

  const handleVariantSelectionChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateSelectedVariantIndex(parseInt(value, 10));
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      updatedSelectedStartDate(date.toISOString());
    } else {
      updatedSelectedStartDate('');
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div>
        <h2>Product: {product.title}</h2>
        <div>
          <h4>Prices:</h4>
          <ul>
            <li>3 days: {product.variantPrices[0]}</li>
            <li>5 days: {product.variantPrices[1]}</li>
            <li>7 days: {product.variantPrices[2]}</li>
          </ul>
        </div>
        <p>Description: {product.description}</p>

        <br />
        <div>
          <h4>
            Select duration for availability then choose date from calendar
          </h4>
          <input
            type="radio"
            name="variant-radio"
            value={0}
            checked={selectedVariantIndex === 0}
            onChange={e => handleVariantSelectionChange(e)}
          />
          <label>3 Days</label>
        </div>
        <div>
          <input
            type="radio"
            name="variant-radio"
            value={1}
            checked={selectedVariantIndex === 1}
            onChange={e => handleVariantSelectionChange(e)}
          />
          <label>5 Days</label>
        </div>
        <div>
          <input
            type="radio"
            name="variant-radio"
            value={2}
            checked={selectedVariantIndex === 2}
            onChange={e => handleVariantSelectionChange(e)}
          />
          <label>7 Days</label>
        </div>
        <div>
          <h4>Enter rental start date:</h4>
          <DatePicker
            availableDates={availableDatesObj}
            handleStartDateSelect={handleStartDateSelect}
          />
          {!!selectedStartDate.length && (
            <>
              <h4>
                Rental end date:{' '}
                {getRentalEndDate(
                  selectedStartDate,
                  selectedVariantIndex
                ).toLocaleDateString()}
              </h4>
              <button onClick={() => handleAddToCheckout()}>Add to cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
