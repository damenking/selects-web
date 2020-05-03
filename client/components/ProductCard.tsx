import React from 'react';
import Router from 'next/router';
import SecondaryButton from '../components/buttons/SecondaryButton';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  imageUrl: string;
  handleAddToCart?: any;
  handleRemoveFromFavorites?: any;
  // Make non optional once pairs with stuff is done
  title?: string;
  category?: string;
  price?: string;
  handle?: string;
}

const ProductCard: React.FunctionComponent<ProductCardProps> = (props) => {
  const handleClick = () => {
    if (props.handle) {
      Router.push(`/product/${props.handle}`);
    }
  };

  return (
    <div>
      <img
        className="responsive-img clickable"
        src={props.imageUrl}
        onClick={handleClick}
      />
      <p className={`${styles.categoryText} text-tiny`}>PRODUCT TYPE</p>
      <p>{`${props.title || 'Product Name'}`}</p>
      <small>
        <u
          className="clickable color-blue-minus-1 font-family-apercu-medium underlined"
          onClick={handleClick}
        >{`$${props.price || '99'} per day`}</u>
      </small>
      {/* {props.handleAddToCart && ( */}
      <div className={styles.favoriteButtonsContainer}>
        <SecondaryButton
          text="Add to Cart"
          handleClick={props.handleAddToCart}
        />
      </div>
      {/* )}
      {props.handleRemoveFromFavorites && ( */}
      <div
        className={`${styles.removeFromFavoritesButtonContainer} color-ink-plus-1 clickable`}
        onClick={props.handleRemoveFromFavorites}
      >
        <img src="/static/icons/lightCloseX.svg" />
        <span>
          <small>Remove</small>
        </span>
      </div>
      {/* )} */}
    </div>
  );
};

export default ProductCard;
