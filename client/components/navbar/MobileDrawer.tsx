import React, { useState } from 'react';

import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
  brandsOptions: string[];
  camerasOptions: string[];
  lensesOptions: string[];
  lightingOptions: string[];
  kitsOptions: string[];
  showDrawer: boolean;
}

interface ExpandedMenus {
  brands: boolean;
  cameras: boolean;
  lenses: boolean;
  lighting: boolean;
  kits: boolean;
}

const defaultExpandedMenus: ExpandedMenus = {
  brands: false,
  cameras: false,
  lenses: false,
  lighting: false,
  kits: false,
};

const MobileDrawer: React.FunctionComponent<MobileDrawerProps> = (props) => {
  const [expandedMenus, updateExpandedMenus] = useState(defaultExpandedMenus);

  const toggleExpandedMenu = (menu: string) => {
    const updatedExpandedMenus: any = { ...expandedMenus };
    updatedExpandedMenus[menu] = !updatedExpandedMenus[menu];
    updateExpandedMenus(updatedExpandedMenus as ExpandedMenus);
  };

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
        <div className={styles.menuOuterContainer}>
          <div
            className={`${styles.menuInnerContainer} clickable`}
            onClick={() => toggleExpandedMenu('brands')}
          >
            <h5>Brands</h5>
            {!expandedMenus.brands && <img src="/static/icons/chevronUp.svg" />}
            {expandedMenus.brands && (
              <img src="/static/icons/chevronDown.svg" />
            )}
          </div>
          <div
            className={`${styles.itemListOuterContainer} ${
              expandedMenus.brands ? styles.itemListOuterContainerExpanded : ''
            }`}
          >
            <div
              className={styles.itemListInnerContainer}
              style={{ height: getMenuHeight('brandsOptions') }}
            >
              {props.brandsOptions.map((option, index) => {
                return (
                  <div key={index} className={styles.menuItem}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.menuOuterContainer}>
          <div
            className={`${styles.menuInnerContainer} clickable`}
            onClick={() => toggleExpandedMenu('cameras')}
          >
            <h5>Cameras</h5>
            {!expandedMenus.cameras && (
              <img src="/static/icons/chevronUp.svg" />
            )}
            {expandedMenus.cameras && (
              <img src="/static/icons/chevronDown.svg" />
            )}
          </div>
          <div
            className={`${styles.itemListOuterContainer} ${
              expandedMenus.cameras ? styles.itemListOuterContainerExpanded : ''
            }`}
          >
            <div
              className={styles.itemListInnerContainer}
              style={{ height: getMenuHeight('camerasOptions') }}
            >
              {props.camerasOptions.map((option, index) => {
                return (
                  <div key={index} className={styles.menuItem}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.menuOuterContainer}>
          <div
            className={`${styles.menuInnerContainer} clickable`}
            onClick={() => toggleExpandedMenu('lenses')}
          >
            <h5>Lenses</h5>
            {!expandedMenus.lenses && <img src="/static/icons/chevronUp.svg" />}
            {expandedMenus.lenses && (
              <img src="/static/icons/chevronDown.svg" />
            )}
          </div>
          <div
            className={`${styles.itemListOuterContainer} ${
              expandedMenus.lenses ? styles.itemListOuterContainerExpanded : ''
            }`}
          >
            <div
              className={styles.itemListInnerContainer}
              style={{ height: getMenuHeight('lensesOptions') }}
            >
              {props.lensesOptions.map((option, index) => {
                return (
                  <div key={index} className={styles.menuItem}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.menuOuterContainer}>
          <div
            className={`${styles.menuInnerContainer} clickable`}
            onClick={() => toggleExpandedMenu('lighting')}
          >
            <h5>Lighting</h5>
            {!expandedMenus.lighting && (
              <img src="/static/icons/chevronUp.svg" />
            )}
            {expandedMenus.lighting && (
              <img src="/static/icons/chevronDown.svg" />
            )}
          </div>
          <div
            className={`${styles.itemListOuterContainer} ${
              expandedMenus.lighting
                ? styles.itemListOuterContainerExpanded
                : ''
            }`}
          >
            <div
              className={styles.itemListInnerContainer}
              style={{ height: getMenuHeight('lightingOptions') }}
            >
              {props.lightingOptions.map((option, index) => {
                return (
                  <div key={index} className={styles.menuItem}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.menuOuterContainer}>
          <div
            className={`${styles.menuInnerContainer} clickable`}
            onClick={() => toggleExpandedMenu('kits')}
          >
            <h5>Kits</h5>
            {!expandedMenus.kits && <img src="/static/icons/chevronUp.svg" />}
            {expandedMenus.kits && <img src="/static/icons/chevronDown.svg" />}
          </div>
          <div
            className={`${styles.itemListOuterContainer} ${
              expandedMenus.kits ? styles.itemListOuterContainerExpanded : ''
            }`}
          >
            <div
              className={styles.itemListInnerContainer}
              style={{ height: getMenuHeight('kitsOptions') }}
            >
              {props.kitsOptions.map((option, index) => {
                return (
                  <div key={index} className={styles.menuItem}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
