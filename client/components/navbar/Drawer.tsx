import React from 'react';
import { DrawerOptionsObj } from '../../interfaces/';

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
                  <span>{option}</span>
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
