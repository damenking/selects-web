import React from 'react';

import styles from './AddToFavorites.module.css';

interface AddToFavoritesProps {
  isDisabled?: boolean;
  handleAddToFavorites: any;
  handleRemoveFromFavorites: any;
  isFavorited: boolean;
}
const AddToFavorites: React.FunctionComponent<AddToFavoritesProps> = (
  props
) => {
  return (
    <div
      onClick={
        props.isFavorited
          ? props.handleRemoveFromFavorites
          : props.handleAddToFavorites
      }
      className={`${styles.container} ${
        props.isDisabled ? styles.disabled : ''
      } 
      ${props.isDisabled ? '' : 'clickable'}`}
    >
      <div className={styles.iconContainer}>
        <img src="/static/icons/emptyStar.svg" />
      </div>
      <span className={styles.textContainer}>
        {props.isFavorited ? 'Favorited' : 'Favorite'}
      </span>
    </div>
  );
};

export default AddToFavorites;
