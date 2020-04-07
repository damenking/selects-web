import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Profile from './Profile';
import Search from './Search';
import Drawer from './Drawer';
import MobileDrawer from './MobileDrawer';
import { checkIsMobile } from '../WindowDimensionsProvider';
import { getMenuCollectionByHandle } from '../../api/shopify/collection';
import { DrawerOptionsObj } from '../../interfaces/';

import styles from './Navbar.module.css';

const Navbar: React.FunctionComponent = () => {
  const [showDrawer, updateShowDrawer] = useState(false);
  const [currentDrawerOptions, updateCurrentDrawerOptions] = useState(
    'brandsOptions'
  );
  const [highlightedMenuItem, updateHighlightedMenuItem] = useState('');
  const [brandsOptions, updateBrandsOptions] = useState([]);
  const [camerasOptions, updateCamerasOptions] = useState([]);
  const [lensesOptions, updateLensesOptions] = useState([]);
  const [lightingOptions, updateLightingOptions] = useState([]);
  const [kitsOptions, updateKitsOptions] = useState([]);
  const isMobile = checkIsMobile();

  useEffect(() => {
    const fetchMenuCollections = async () => {
      const [brands, cameras, lenses, lighting, kits] = await Promise.all([
        getMenuCollectionByHandle('brands-menu'),
        getMenuCollectionByHandle('cameras-menu'),
        getMenuCollectionByHandle('lenses-menu'),
        getMenuCollectionByHandle('lighting-menu'),
        getMenuCollectionByHandle('kits-menu'),
      ]);
      updateBrandsOptions(brands.options);
      updateCamerasOptions(cameras.options);
      updateLensesOptions(lenses.options);
      updateLightingOptions(lighting.options);
      updateKitsOptions(kits.options);
    };
    fetchMenuCollections();
  }, []);

  const getDrawerOptions = () => {
    switch (currentDrawerOptions) {
      case 'brandsOptions':
        return { elIndex: 0, options: brandsOptions } as DrawerOptionsObj;
      case 'camerasOptions':
        return { elIndex: 1, options: camerasOptions } as DrawerOptionsObj;
      case 'lensesOptions':
        return { elIndex: 2, options: lensesOptions } as DrawerOptionsObj;
      case 'lightingOptions':
        return { elIndex: 3, options: lightingOptions } as DrawerOptionsObj;
      case 'kitsOptions':
        return { elIndex: 4, options: kitsOptions } as DrawerOptionsObj;
      default:
        return { elIndex: 0, options: brandsOptions } as DrawerOptionsObj;
    }
  };

  const handleMenuMouseOver = (options: string) => {
    setHighlightedMenuItem(options);
    handleShowDrawer(options);
  };

  const handleShowDrawer = (options: string) => {
    updateCurrentDrawerOptions(options);
    updateShowDrawer(true);
  };

  const handleHideDrawer = () => {
    updateShowDrawer(false);
    updateHighlightedMenuItem('');
  };

  const setHighlightedMenuItem = (menuItem: string) => {
    updateHighlightedMenuItem(menuItem);
  };

  const handleSetShowMobileDrawer = (show: boolean) => {
    updateShowDrawer(show);
  };

  if (isMobile) {
    return (
      <nav className={`${styles.navbarContainerMobile} background-paper`}>
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
        <div className={`${styles.navbarCenterInnerContainer} clickable`}>
          <Link href="/">
            <img src="/static/icons/selectsFull.svg" />
          </Link>
        </div>
        <div className={styles.navbarRightInnerContainer}>
          <Search />
          <Profile />
          <Link href="/cart">
            <img className="clickable" src="/static/icons/cart.svg" />
          </Link>
        </div>
        <MobileDrawer
          brandsOptions={brandsOptions}
          camerasOptions={camerasOptions}
          lensesOptions={lensesOptions}
          lightingOptions={lightingOptions}
          kitsOptions={kitsOptions}
          showDrawer={showDrawer}
        />
      </nav>
    );
  }
  return (
    <nav className={`${styles.navbarContainer} background-paper`}>
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
              highlightedMenuItem === 'brandsOptions'
                ? styles.menuHighlighted
                : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('brandsOptions')}
          >
            <span>Brands</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'camerasOptions'
                ? styles.menuHighlighted
                : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('camerasOptions')}
          >
            <span>Cameras</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'lensesOptions'
                ? styles.menuHighlighted
                : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('lensesOptions')}
          >
            <span>Lenses</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'lightingOptions'
                ? styles.menuHighlighted
                : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('lightingOptions')}
          >
            <span>Lighting</span>
          </div>
        </div>
        <div className={styles.categoryItemOuterContainer}>
          <div></div>
          <div
            className={`${styles.categoryItemInnerContainer} ${
              highlightedMenuItem === 'kitsOptions'
                ? styles.menuHighlighted
                : ''
            }`}
            onMouseOver={() => handleMenuMouseOver('kitsOptions')}
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
        <Link href="/cart">
          <img className="clickable" src="/static/icons/cart.svg" />
        </Link>
      </div>
      {showDrawer && (
        <Drawer
          options={getDrawerOptions()}
          handleHideDrawer={handleHideDrawer}
        />
      )}
    </nav>
  );
};

export default Navbar;
