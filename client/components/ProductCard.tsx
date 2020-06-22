import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import SecondaryButton from '../components/buttons/SecondaryButton';

import styles from './ProductCard.module.css';

// const placeholderImage =
//   'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*';

interface ProductCardProps {
  imageUrl: string;
  handleAddToCart?: any;
  handleRemoveFromFavorites?: any;
  title: string;
  category?: string;
  price: string;
  handle: string;
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
      {/* <p className={`${styles.categoryText} text-tiny`}>PRODUCT TYPE</p> */}
      <Link href="/product/[handle]" as={`/product/${props.handle}`}>
        <a>{props.title}</a>
      </Link>
      <br />
      <small>
        <u
          className="clickable color-blue-minus-1 font-family-apercu-medium underlined"
          onClick={handleClick}
        >
          {props.price}
        </u>
      </small>
      {props.handleAddToCart && (
        <div className={styles.favoriteButtonsContainer}>
          <SecondaryButton
            text="Add to Cart"
            handleClick={props.handleAddToCart}
          />
        </div>
      )}
      {props.handleRemoveFromFavorites && (
        <div
          className={`${styles.removeFromFavoritesButtonContainer} color-ink-plus-1 clickable`}
          onClick={props.handleRemoveFromFavorites}
        >
          <img src="/static/icons/lightCloseX.svg" />
          <span>
            <small>Remove</small>
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
