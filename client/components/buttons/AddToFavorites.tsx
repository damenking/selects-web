import React from 'react';

import styles from './AddToFavorites.module.css';

const AddToFavorites: React.FunctionComponent = () => {
  return (
    <div className={`${styles.container} clickable`}>
      <div className={styles.iconContainer}>
        <img src="/static/icons/emptyStar.svg" />
      </div>
      <span className={styles.textContainer}>Favorite</span>
    </div>
  );
};

export default AddToFavorites;
