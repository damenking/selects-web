import React, { useState } from 'react';
import Link from 'next/link';
import Profile from './Profile';
import Search from './Search';
import Drawer from './Drawer';
import Cart from './Cart';
import MobileDrawer from './MobileDrawer';
import { checkIsMobile } from '../WindowDimensionsProvider';

import styles from './Navbar.module.css';

const Navbar: React.FunctionComponent = () => {
  const [showDrawer, updateShowDrawer] = useState(false);
  const [highlightedMenuItem, updateHighlightedMenuItem] = useState('brands');
  const isMobile = checkIsMobile();

  const handleMenuMouseOver = (options: string) => {
    setHighlightedMenuItem(options);
    handleShowDrawer();
  };

  const handleShowDrawer = () => {
    updateShowDrawer(true);
  };

  const handleHideDrawer = () => {
    updateShowDrawer(false);
    updateHighlightedMenuItem('brands');
  };

  const setHighlightedMenuItem = (menuItem: string) => {
    updateHighlightedMenuItem(menuItem);
  };

  const handleSetShowMobileDrawer = (show: boolean) => {
    updateShowDrawer(show);
  };

  if (isMobile) {
    return (
      <nav className={`${styles.navbarContainerMobile} background-color-paper`}>
        <div className={`${styles.navbarLeftInnerContainer} clickable`}>
          {!showDrawer && (
            <img
              src="/static/icons/hamburgerMenu.svg"
              onClick={() => handleSetShowMobileDrawer(true)}
            />
          )}
          {showDrawer && (
            <img
              src="/static/icons/closeX.svg"
              onClick={() => handleSetShowMobileDrawer(false)}
            />
          )}
        </div>
        <div className={`${styles.navbarCenterInnerContainerMobile} clickable`}>
          <Link href="/">
            <img src="/static/icons/selectsFull.svg" />
          </Link>
        </div>
        <div className={styles.navbarRightInnerContainer}>
          <Search />
          <Profile />
          <Cart />
        </div>
        <MobileDrawer
          showDrawer={showDrawer}
          handleHideDrawer={handleHideDrawer}
        />
      </nav>
    );
  }
  return (
    <nav className={`${styles.navbarContainer} background-color-paper`}>
      {showDrawer && (
        <Drawer
          displayedMenu={highlightedMenuItem}
          handleHideDrawer={handleHideDrawer}
        />
      )}
      <div
        className={styles.navbarLeftInnerContainer}
        onMouseEnter={handleHideDrawer}
      >
        <Link href="/">
          <img className="clickable" src="/static/icons/selectsMin.svg" />
        </Link>
      </div>
      <div className={styles.navbarCenterInnerContainer}>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'brands' ? styles.menuHighlighted : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('brands')}
          >
            <span>Brands</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'cameras' ? styles.menuHighlighted : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('cameras')}
          >
            <span>Cameras</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'lenses' ? styles.menuHighlighted : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('lenses')}
          >
            <span>Lenses</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'lighting' ? styles.menuHighlighted : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('lighting')}
          >
            <span>Lighting</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'kits' ? styles.menuHighlighted : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('kits')}
          >
            <span>Kits</span>
          </div>
        </div>
      </div>
      <div
        className={styles.navbarRightInnerContainer}
        onMouseEnter={handleHideDrawer}
      >
        <Search />
        <Profile />
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
