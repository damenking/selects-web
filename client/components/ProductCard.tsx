import React from 'react';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  imageUrl: string;
  category?: string;
  price?: string;
}

const ProductCard: React.FunctionComponent<ProductCardProps> = (props) => {
  return (
    <div>
      <img className="responsive-img clickable" src={props.imageUrl} />
      <p className={`${styles.categoryText} text-tiny`}>product type</p>
      <p>Product Name</p>
      <small>
        <u>$99 per day</u>
      </small>
    </div>
  );
};

export default ProductCard;
