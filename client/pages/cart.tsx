import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { getCheckout, removeLineItems } from '../api/shopify/checkout';
import UserContext from '../components/UserContext';
import {
  CheckoutLineItem,
  ReservationLineItem,
  CustomAttribute,
} from '../interfaces/index';
import { createAndConfirmReservation } from '../api/bta/booking';
import { createOrder } from '../api/shopify/order';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { checkIsMobile } from '../components/WindowDimensionsProvider';

import styles from './cart.module.css';

const defaultLineItems: CheckoutLineItem[] = [];

const CartPage: NextPage = () => {
  const isMobile = checkIsMobile();
  const { checkoutId, user, updateCheckoutId } = useContext(UserContext);
  const [lineItems, setLineItems] = useState(defaultLineItems);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [error, setError] = useState(false);
  let subTotal = 0.0;

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
    lineItems.forEach((lineItem) => {
      let external_id = '';
      let start = '';
      let finish = '';
      lineItem.customAttributes.forEach((attribute: CustomAttribute) => {
        if (attribute.key === 'external_id') {
          external_id = attribute.value;
        } else if (attribute.key === 'start') {
          start = attribute.value;
        } else if (attribute.key === 'finish') {
          finish = attribute.value;
        }
      });
      const reservationLineItem: ReservationLineItem = {
        external_id,
        start,
        finish,
        quantity: '1',
      };
      reservationItems.push(reservationLineItem);
    });
    createAndConfirmReservation(
      checkoutId,
      user.first_name,
      user.last_name,
      user.email,
      reservationItems
    );
    if (onAccount) {
      createShopifyOrder();
      updateCheckoutId(user.email, user.default_address);
    } else {
      window.location.href = checkoutUrl;
    }
  };

  if (error) {
    return <h1>There was an error...</h1>;
  }
  if (isMobile) {
    return (
      <div className={`${styles.containerMobile} grid-mobile-layout`}>
        <h4>Cart</h4>
        <div className="col-span-4">
          {lineItems.map((lineItem: CheckoutLineItem, index: number) => {
            if (index === 0) {
              subTotal = 0.0;
            }
            subTotal =
              subTotal +
              parseInt(lineItem.variant.price, 10) * lineItem.quantity;
            return (
              <React.Fragment key={lineItem.id}>
                <div className={styles.lineContainer}>
                  <img
                    src={lineItem.variant.image.src}
                    height="70px"
                    width="70px"
                  />
                  <div className={styles.lineContentMobile}>
                    <div className={styles.lineContentLine1}>
                      <span>{lineItem.title}</span>
                      <span>{`$${lineItem.variant.price}`}</span>
                    </div>
                    <p className="font-family-apercu-medium">
                      Quantity {lineItem.quantity}
                    </p>

                    <div
                      className={`${styles.lineButtonsContainer} font-family-apercu-medium`}
                    >
                      <span
                        className="underlined clickable"
                        onClick={() => handleRemoveLineItem(lineItem.id)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>

                <hr style={{ marginTop: '24px', marginBottom: '24px' }} />
              </React.Fragment>
            );
          })}
          {!!lineItems.length && !!checkoutUrl.length && (
            <div>
              <p className={styles.summaryHeader}>Summary</p>
              <hr />
              <div className={styles.summaryLine}>
                <span>Subtotal</span>
                <span>{`$${subTotal}`}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Sales Tax</span>
                <span>$0.00</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Shipping</span>
                <span>Free Delivery</span>
              </div>
              <div
                className={`${styles.summaryTotalLine} font-family-apercu-medium`}
              >
                <span>Total</span>
                <span>{`$${subTotal}`}</span>
              </div>
              <PrimaryButton
                text="Checkout"
                handleClick={() => handleConfirmBooking(false)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${styles.containerDesktop} grid-desktop-layout-expandable`}
    >
      <div className="col-span-6-offset-1">
        <h4>Cart</h4>
        {lineItems.map((lineItem: CheckoutLineItem, index: number) => {
          if (index === 0) {
            subTotal = 0.0;
          }
          subTotal =
            subTotal + parseInt(lineItem.variant.price, 10) * lineItem.quantity;
          return (
            <React.Fragment key={lineItem.id}>
              <div className={styles.lineContainer}>
                <img
                  src={lineItem.variant.image.src}
                  height="212px"
                  width="212px"
                />
                <div className={styles.lineContent}>
                  <div className={styles.lineContentLine1}>
                    <span>{lineItem.title}</span>
                    <span>{`$${lineItem.variant.price}`}</span>
                  </div>
                  <p className="font-family-apercu-medium">
                    Quantity {lineItem.quantity}
                  </p>

                  <div
                    className={`${styles.lineButtonsContainer} font-family-apercu-medium`}
                  >
                    <span
                      className="underlined clickable"
                      onClick={() => handleRemoveLineItem(lineItem.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>

              <hr style={{ marginTop: '24px', marginBottom: '24px' }} />
            </React.Fragment>
          );
        })}
      </div>
      <div className="col-span-1" />
      {!!lineItems.length && !!checkoutUrl.length && (
        <div className="col-span-3">
          <p className={styles.summaryHeader}>Summary</p>
          <hr />
          <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <span>{`$${subTotal}`}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Sales Tax</span>
            <span>$0.00</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Shipping</span>
            <span>Free Delivery</span>
          </div>
          <div
            className={`${styles.summaryTotalLine} font-family-apercu-medium`}
          >
            <span>Total</span>
            <span>{`$${subTotal}`}</span>
          </div>
          <PrimaryButton
            text="Checkout"
            handleClick={() => handleConfirmBooking(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
