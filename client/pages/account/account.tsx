import React, { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import AccountLayout from '../../components/account/AccountLayout';
import AccountInfo from '../../components/account/AccountInfo';
import Favorites from '../../components/account/Favorites';
import Orders from '../../components/account/Orders';
// import Address from '../../components/account/Address';
import UserContext from '../../components/UserContext';

const AccountPage: NextPage = () => {
  const { loggedIn, loadingUser } = useContext(UserContext);
  const router = useRouter();
  const tab = router.query.tab as string;

  useEffect(() => {
    if (!loadingUser && !loggedIn) {
      Router.push(`/account/signIn?route=/account/account?tab=${tab}`);
    }
  }, [loadingUser]);

  const getTabContent = () => {
    if (tab === 'info') {
      return <AccountInfo />;
    } else if (tab === 'orders') {
      return <Orders />;
    } else if (tab === 'favorites') {
      return <Favorites />;
      // } else if (tab === 'address') {
      //   return <Address />;
    }
    return null;
  };

  return <AccountLayout>{getTabContent()}</AccountLayout>;
};

export default AccountPage;
