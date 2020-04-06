import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../../components/UserContext';
import { checkIsMobile } from '../WindowDimensionsProvider';

import styles from './Profile.module.css';

const Profile: React.FunctionComponent = () => {
  const { loggedIn, signOut, user } = useContext(UserContext);
  const isMobile = checkIsMobile();

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
      <div className={`${styles.profileContainer} display-flex clickable`}>
        <span onClick={signOut}>{user.displayName}</span>
        <img src="/static/icons/chevronDown.svg" />
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
