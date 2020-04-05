import React from 'react';
import Link from 'next/link';
import Profile from './Profile';
import Search from './Search';

import styles from './Navbar.module.css';

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className={`${styles.navbarContainer} background-paper`}>
      <div className={styles.navbarLeftInnerContainer}>
        <Link href="/">
          <img className="clickable" src="/static/icons/selectsMin.svg" />
        </Link>
      </div>
      <div className={styles.navbarCenterInnerContainer}>
        <div className={styles.categoryItemContainer}>
          <span>Brands</span>
        </div>
        <div className={styles.categoryItemContainer}>
          <span>Cameras</span>
        </div>
        <div className={styles.categoryItemContainer}>
          <span>Lenses</span>
        </div>
        <div className={styles.categoryItemContainer}>
          <span>Lighting</span>
        </div>
        <div className={styles.categoryItemContainer}>
          <span>Kits</span>
        </div>
      </div>
      <div className={styles.navbarRightInnerContainer}>
        <Search />
        <Profile />
        <Link href="/cart">
          <img className="clickable" src="/static/icons/cart.svg" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
