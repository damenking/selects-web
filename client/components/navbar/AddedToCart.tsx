import React from 'react';
import Router from 'next/router';
import SecondaryButton from '../../components/buttons/SecondaryButton';

import styles from './AddedToCart.module.css';

interface HandleClose {
  (): void;
}

interface AddedToCartProps {
  imageUrl: string;
  title: string;
  priceText: string;
  handleClose: HandleClose;
  hidden: boolean;
}

const AddedToCart: React.FunctionComponent<AddedToCartProps> = (props) => {
  const handleAddToCartClick = () => {
    props.handleClose();
    Router.push('/cart');
  };

  return (
    <div
      className={`${styles.outerContainer} ${
        props.hidden ? styles.hidden : ''
      }`}
    >
      <div className={styles.innerContainer}>
        <div className={styles.topBar}>
          <small>Added to cart</small>
          <img
            src="/static/icons/closeX.svg"
            onClick={props.handleClose}
            className="clickable"
          />
        </div>
        <div className={styles.productContainer}>
          <img height="90px" width="90px" src={props.imageUrl} />
          <div>
            <p>{props.title}</p>
            <p>{props.priceText}</p>
          </div>
        </div>
        <SecondaryButton text="View Cart" handleClick={handleAddToCartClick} />
      </div>
    </div>
  );
};

export default AddedToCart;
