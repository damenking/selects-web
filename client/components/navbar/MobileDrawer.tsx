import React from 'react';
import ExpandableMenuItem from '../ExpandableMenuItem';
import Link from 'next/link';
import { getHandleFromName } from '../../util/shopify';

import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
  brandsOptions: string[];
  camerasOptions: string[];
  lensesOptions: string[];
  lightingOptions: string[];
  kitsOptions: string[];
  showDrawer: boolean;
  handleHideDrawer: any;
}

const MobileDrawer: React.FunctionComponent<MobileDrawerProps> = (props) => {
  const getMenuHeight = (menuOptions: string) => {
    const optionsLength = (props as any)[menuOptions].length;
    if (optionsLength < 5) {
      return `${optionsLength * 36}px`;
    } else if (optionsLength > 20 && optionsLength <= 25) {
      return '180px';
    } else {
      return '216px';
    }
  };

  return (
    <div
      className={`${styles.drawerOuterContainer} ${
        props.showDrawer ? styles.drawerOpen : ''
      }`}
    >
      <div className={styles.drawerInnerContainer}>
        <ExpandableMenuItem title="brands">
          <div
            className={styles.itemListInnerContainer}
            style={{ height: getMenuHeight('brandsOptions') }}
          >
            {props.brandsOptions.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.menuItem} clickable`}
                  onClick={props.handleHideDrawer}
                >
                  <Link
                    href="/collection/[handle]"
                    as={`/collection/${getHandleFromName(option)}`}
                  >
                    <span>{option}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </ExpandableMenuItem>
        <ExpandableMenuItem title="cameras">
          <div
            className={styles.itemListInnerContainer}
            style={{ height: getMenuHeight('camerasOptions') }}
          >
            {props.camerasOptions.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.menuItem} clickable`}
                  onClick={props.handleHideDrawer}
                >
                  <Link
                    href="/collection/[handle]"
                    as={`/collection/${getHandleFromName(option)}`}
                  >
                    <span>{option}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </ExpandableMenuItem>

        <ExpandableMenuItem title="lenses">
          <div
            className={styles.itemListInnerContainer}
            style={{ height: getMenuHeight('lensesOptions') }}
          >
            {props.lensesOptions.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.menuItem} clickable`}
                  onClick={props.handleHideDrawer}
                >
                  <Link
                    href="/collection/[handle]"
                    as={`/collection/${getHandleFromName(option)}`}
                  >
                    <span>{option}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </ExpandableMenuItem>

        <ExpandableMenuItem title="lighting">
          <div
            className={styles.itemListInnerContainer}
            style={{ height: getMenuHeight('lightingOptions') }}
          >
            {props.lightingOptions.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.menuItem} clickable`}
                  onClick={props.handleHideDrawer}
                >
                  <Link
                    href="/collection/[handle]"
                    as={`/collection/${getHandleFromName(option)}`}
                  >
                    <span>{option}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </ExpandableMenuItem>

        <ExpandableMenuItem title="kits">
          <div
            className={styles.itemListInnerContainer}
            style={{ height: getMenuHeight('kitsOptions') }}
          >
            {props.kitsOptions.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.menuItem} clickable`}
                  onClick={props.handleHideDrawer}
                >
                  <Link
                    href="/collection/[handle]"
                    as={`/collection/${getHandleFromName(option)}`}
                  >
                    <span>{option}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </ExpandableMenuItem>
      </div>
    </div>
  );
};

export default MobileDrawer;
