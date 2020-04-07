import React from 'react';
import { NextPage } from 'next';

import styles from './index.module.css';

const IndexPage: NextPage = () => {
  return (
    <div className={styles.hero}>
      <h3>This is the home page!</h3>
    </div>
  );
};

export default IndexPage;
