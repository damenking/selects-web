import React, { useState } from 'react';
import Router from 'next/router';

import styles from './AccountLayout.module.css';

const AccountLayout: React.FunctionComponent = ({ children }) => {
  const [selectedTab, updateSelectedTab] = useState('info');

  const handleTabClick = (tab: string) => {
    updateSelectedTab(tab);
    Router.replace(`/account/account?tab=${tab}`);
  };

  return (
    <div className={`${styles.container} grid-desktop-layout`}>
      <div className={`${styles.menuContainer} col-span-2`}>
        <div className={styles.menuHeader}>
          <small>My Account</small>
        </div>
        <div className={`${styles.menu} font-family-apercu-medium`}>
          <small
            className={`${
              selectedTab === 'info' ? styles.selectedMenuOption : ''
            } clickable`}
            onClick={() => handleTabClick('info')}
          >
            Account Info
          </small>
          <small
            className={`${
              selectedTab === 'address' ? styles.selectedMenuOption : ''
            } clickable`}
            onClick={() => handleTabClick('address')}
          >
            Address
          </small>
          <small
            className={`${
              selectedTab === 'orders' ? styles.selectedMenuOption : ''
            } clickable`}
            onClick={() => handleTabClick('orders')}
          >
            Orders
          </small>
          <small
            className={`${
              selectedTab === 'favorites' ? styles.selectedMenuOption : ''
            } clickable`}
            onClick={() => handleTabClick('favorites')}
          >
            Favorites
          </small>
        </div>
      </div>
      <div className="col-span-8">{children}</div>
    </div>
  );
};

export default AccountLayout;
