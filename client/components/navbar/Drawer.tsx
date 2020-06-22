import React from 'react';
import Router from 'next/router';
import styles from './Drawer.module.css';
import { menuTree } from './constants';

interface DrawerProps {
  displayedMenu: string;
  handleHideDrawer: any;
}

const Drawer: React.FunctionComponent<DrawerProps> = (props) => {
  const handleClick = (tags: string[]) => {
    props.handleHideDrawer();
    Router.push({
      pathname: '/products/byTags',
      query: { tags: tags.join(',') },
    });
  };

  const { displayedMenu } = props;

  return (
    <div
      className={styles.drawerOuterContainer}
      onMouseLeave={props.handleHideDrawer}
    >
      <div className={styles.drawerInnerContainer}>
        {menuTree[displayedMenu]?.ordered.map((subMenu: string) => {
          return (
            <div className={styles.subMenuContainer}>
              <p className={styles.subMenuHeader}>
                {menuTree[displayedMenu][subMenu].title}
              </p>
              <div className={styles.subMenuItemsContainer}>
                {menuTree[displayedMenu][subMenu]?.ordered.map(
                  (menuItem: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.menuItem} clickable`}
                        onClick={() =>
                          handleClick(
                            menuTree[displayedMenu][subMenu][menuItem].tags
                          )
                        }
                      >
                        <span>
                          {menuTree[displayedMenu][subMenu][menuItem].title}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Drawer;
