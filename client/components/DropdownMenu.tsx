import React from 'react';

import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  showDropdown: boolean;
  handleMenuOnBlur: any;
}
const DropdownMenu: React.FunctionComponent<DropdownMenuProps> = (props) => {
  return (
    <div
      id="profile-dropdown-menu"
      tabIndex={0}
      className={`${styles.outerContainer} ${
        props.showDropdown ? '' : styles.outerContainerHidden
      } `}
      onBlur={props.handleMenuOnBlur}
    >
      {props.children}
    </div>
  );
};

export default DropdownMenu;
