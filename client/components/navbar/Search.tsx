import React, { useState, useEffect } from 'react';
import Router from 'next/router';
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const executeSearch = () => {
    const searchTerm = searchValue !== 'SEARCH' ? searchValue : '';
    Router.push({ pathname: '/search', query: { searchTerm: searchTerm } });
  };

  return (
    <div className={`display-flex ${inputHidden ? 'clickable' : ''}`}>
      <img
        onMouseDown={executeSearch}
        src="/static/icons/search.svg"
        className="clickable"
      />
      {!inputHidden && (
        <input
          className={styles.searchInput}
          type="text"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={searchValue}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default Search;
