import React, { useContext, useState } from 'react';
import Link from 'next/link';
import UserContext from '../../components/UserContext';
import { checkIsMobile } from '../WindowDimensionsProvider';
import DropdownMenu from '../DropdownMenu';

import styles from './Profile.module.css';

const Profile: React.FunctionComponent = () => {
  const { loggedIn, signOut, user } = useContext(UserContext);
  const [showDropdown, updateShowDropdown] = useState(false);

  const isMobile = checkIsMobile();

  const handleLoggedInClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    updateShowDropdown(!showDropdown);
    const dropdownEl = document.getElementById(
      'profile-dropdown-menu'
    ) as HTMLElement;
    dropdownEl.focus();
  };

  const handleMenuOnBlur = () => {
    updateShowDropdown(false);
  };

  const handleSignOutClick = () => {
    updateShowDropdown(false);
    signOut();
  };

  if (isMobile) {
    return (
      <div
        className={`${styles.profileContainerMobile} display-flex clickable`}
      >
        <img src="/static/icons/emptyStar.svg" />
      </div>
    );
  } else if (loggedIn) {
    return (
      <div className={`${styles.profileContainer} clickable`}>
        <div className="display-flex" onMouseDown={handleLoggedInClick}>
          <span>{user.displayName}</span>
          <img src="/static/icons/chevronDown.svg" />
        </div>
        <DropdownMenu
          showDropdown={showDropdown}
          handleMenuOnBlur={handleMenuOnBlur}
        >
          <div className={styles.dropdownContent}>
            <Link href="/orderHistory">
              <p onClick={() => updateShowDropdown(false)}>Order History</p>
            </Link>
            <p onClick={handleSignOutClick}>Sign Out</p>
          </div>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <div className={`${styles.profileContainer} clickable`}>
        <Link href="/signIn">
          <span>Sign In</span>
        </Link>
      </div>
    );
  }
};

export default Profile;
