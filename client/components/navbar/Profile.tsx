import React, { useContext, useState } from 'react';
import Link from 'next/link';
import UserContext from '../../components/UserContext';
import { checkIsMobile } from '../WindowDimensionsProvider';
import DropdownMenu from '../DropdownMenu';

import styles from './Profile.module.css';

const Profile: React.FunctionComponent = () => {
  const { signOut, loggedIn } = useContext(UserContext);
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

  return (
    <div className={`${styles.profileContainer} clickable`}>
      {!isMobile && (
        <div className="display-flex" onMouseDown={handleLoggedInClick}>
          <span>Account</span>
          <img
            src={`/static/icons/${
              showDropdown ? 'chevronUp.svg' : 'chevronDown.svg'
            }`}
          />
        </div>
      )}
      {isMobile && (
        <div
          className={`${styles.profileContainerMobile} display-flex clickable`}
          onMouseDown={handleLoggedInClick}
        >
          <img src="/static/icons/genericAvatar.svg" />
        </div>
      )}
      <DropdownMenu
        showDropdown={showDropdown}
        handleMenuOnBlur={handleMenuOnBlur}
      >
        <div className={styles.dropdownContent}>
          <Link href="/account/account?tab=info">
            <p onClick={() => updateShowDropdown(false)}>Account Info</p>
          </Link>
          <Link href="/account/account?tab=address">
            <p onClick={() => updateShowDropdown(false)}>Address</p>
          </Link>
          <Link href="/account/account?tab=orders">
            <p onClick={() => updateShowDropdown(false)}>Orders</p>
          </Link>
          <Link href="/account/account?tab=favorites">
            <p onClick={() => updateShowDropdown(false)}>Favorites</p>
          </Link>
          {loggedIn && <p onClick={handleSignOutClick}>Sign Out</p>}
        </div>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
