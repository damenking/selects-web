import React from 'react';
import Navbar from './navbar/Navbar';

import styles from './Layout.module.css';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className={styles.layout}> {children}</div>

      <footer>
        <hr />
        <span>This is a footer</span>
      </footer>
    </div>
  );
};

export default Layout;
