import React, { useState, useEffect } from 'react';
import { checkIsMobile } from '../WindowDimensionsProvider';

import styles from './Search.module.css';

const Search: React.FunctionComponent = () => {
  const [searchValue, updateSearchValue] = useState('SEARCH');
  const [inputHidden, updateInputHidden] = useState(false);
  const isMobile = checkIsMobile();

  useEffect(() => {
    if (isMobile) {
      updateInputHidden(true);
    } else {
      updateInputHidden(false);
    }
  }, [isMobile]);

  const handleOnFocus = () => {
    updateSearchValue('');
  };

  const handleOnBlur = () => {
    updateSearchValue('SEARCH');
  };

  const handleOnChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateSearchValue(value);
  };

  return (
    <div className={`display-flex ${inputHidden ? 'clickable' : ''}`}>
      <img src="/static/icons/search.svg" />
      {!inputHidden && (
        <input
          className={styles.searchInput}
          type="text"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={searchValue}
        />
      )}
    </div>
  );
};

export default Search;
