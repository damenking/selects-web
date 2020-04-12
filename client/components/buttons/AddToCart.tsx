import React from 'react';

import styles from './AddToCart.module.css';

interface AddToCardProps {
  isDisabled: boolean;
}

const AddToCart: React.FunctionComponent<AddToCardProps> = (props) => {
  return (
    <div
      className={`${styles.container} ${
        props.isDisabled ? styles.disabled : ''
      } background-color-orange clickable`}
    >
      <div className={styles.iconContainer}>
        <img src="/static/icons/cartAdd.svg" />
      </div>
      <span className={styles.textContainer}>Add to cart</span>
    </div>
  );
};

export default AddToCart;
