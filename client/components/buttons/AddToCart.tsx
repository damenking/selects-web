import React from 'react';

import styles from './AddToCart.module.css';

interface AddToCardProps {
  isDisabled: boolean;
  handleAddToCheckout: any;
}

const AddToCart: React.FunctionComponent<AddToCardProps> = (props) => {
  return (
    <div
      className={`${styles.container} ${
        props.isDisabled ? styles.disabled : ''
      } 
      ${props.isDisabled ? '' : 'clickable'}
      background-color-orange`}
      onClick={props.handleAddToCheckout}
    >
      <div className={styles.iconContainer}>
        <img src="/static/icons/cartAdd.svg" />
      </div>
      <span className={styles.textContainer}>Add to cart</span>
    </div>
  );
};

export default AddToCart;
