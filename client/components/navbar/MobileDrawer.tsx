import React from 'react';
import ExpandableMenuItem from '../ExpandableMenuItem';
import Router from 'next/router';
import { menuTree } from './constants';

import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
  showDrawer: boolean;
  handleHideDrawer: any;
}

const MobileDrawer: React.FunctionComponent<MobileDrawerProps> = (props) => {
  const handleClick = (tags: string[]) => {
    props.handleHideDrawer();
    Router.push({
      pathname: '/products/byTags',
      query: { tags: tags.join(',') },
    });
  };
  return (
    <div
      className={`${styles.drawerOuterContainer} ${
        props.showDrawer ? styles.drawerOpen : ''
      }`}
    >
      <div className={styles.drawerInnerContainer}>
        {menuTree.ordered.map((menu: string) => {
          return (
            <ExpandableMenuItem title={menu} size="large" key={menu}>
              <div className={styles.subMenuContainer}>
                {menuTree[menu]?.ordered.map((subMenu: string) => {
                  return (
                    <ExpandableMenuItem
                      title={menuTree[menu][subMenu].title}
                      size="small"
                      key={subMenu}
                    >
                      {menuTree[menu][subMenu].ordered.map(
                        (menuItem: string, index: number) => {
                          return (
                            <div
                              key={index}
                              className={`${styles.menuItem} clickable`}
                              onClick={() =>
                                handleClick(
                                  menuTree[menu][subMenu][menuItem].tags
                                )
                              }
                            >
                              <span>
                                {menuTree[menu][subMenu][menuItem].title}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </ExpandableMenuItem>
                  );
                })}
              </div>
            </ExpandableMenuItem>
          );
        })}
      </div>
    </div>
  );
};

export default MobileDrawer;
