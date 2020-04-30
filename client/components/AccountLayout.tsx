import React from 'react';

import styles from './AccountLayout.module.css';

const AccountLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className={`${styles.container} grid-desktop-layout`}>
      <div className={`${styles.menuContainer} col-span-2`}>
        <div className={styles.menuHeader}>
          <small>My Account</small>
        </div>
        <div className={`${styles.menu} font-family-apercu-medium`}>
          <small className={`clickable underlined`}>Account Info</small>
          <small className={`clickable`}>Address</small>
          <small className={`clickable`}>Orders</small>
          <small className={`clickable`}>Favorites</small>
        </div>
      </div>
      <div className="col-span-8">{children}</div>
    </div>
  );
};

export default AccountLayout;
