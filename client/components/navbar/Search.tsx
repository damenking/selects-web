import React, { useState } from 'react';
// import Link from 'next/link';

import styles from './Search.module.css';

const Search: React.FunctionComponent = () => {
  const [searchValue, updateSearchValue] = useState('SEARCH');

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
    <div className={`display-flex`}>
      <img src="/static/icons/search.svg" />
      <input
        className={styles.searchInput}
        type="text"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
