import React from 'react';
import Link from 'next/link';
import { DrawerOptionsObj } from '../../interfaces/';
import { getHandleFromName } from '../../util/shopify';

import styles from './Drawer.module.css';

interface DrawerProps {
  options: DrawerOptionsObj;
  handleHideDrawer: any;
}

const Drawer: React.FunctionComponent<DrawerProps> = (props) => {
  const options = props.options;

  const displayOptionsByElIndex = (index: number) => {
    if (index === options.elIndex) {
      return (
        <div className={styles.categoryListOuterContainer}>
          {options.options.map((option, index) => {
            return (
              <React.Fragment key={index}>
                <div></div>
                <div
                  key={index}
                  className={`${styles.categoryListItem} clickable`}
                >
                  <Link
                    href="/collection/[handle]"
                    as={`/collection/${getHandleFromName(option)}`}
                  >
                    <span>{option}</span>
                  </Link>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      );
    } else {
      return <div className={styles.categoryListOuterContainer}></div>;
    }
  };

  return (
    <div
      className={styles.drawerOuterContainer}
      onMouseLeave={props.handleHideDrawer}
    >
      <div className={styles.drawerInnerContainer}>
        <div></div>
        <div className={styles.drawerCenterContainer}>
          {displayOptionsByElIndex(0)}
          {displayOptionsByElIndex(1)}
          {displayOptionsByElIndex(2)}
          {displayOptionsByElIndex(3)}
          {displayOptionsByElIndex(4)}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Drawer;
