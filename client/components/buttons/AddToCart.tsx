import React from 'react';

import styles from './AddToCart.module.css';

const AddToCart: React.FunctionComponent = () => {
  return (
    <div className={`${styles.container} background-color-orange clickable`}>
      <div className={styles.iconContainer}>
        <img src="/static/icons/cartAdd.svg" />
      </div>
      <span className={styles.textContainer}>Add to cart</span>
    </div>
  );
};

export default AddToCart;
