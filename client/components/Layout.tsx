import React from 'react';
import Navbar from './navbar/Navbar';

import styles from './Layout.module.css';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {children}
      <footer>
        <hr />
        <span className={styles.test}>
          This is a red footer with a third party font
        </span>
      </footer>
    </div>
  );
};

export default Layout;
