import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../components/UserContext';

const SignIn: React.FunctionComponent = () => {
  const { loggedIn, signOut } = useContext(UserContext);
  if (loggedIn) {
    return <button onClick={signOut}>Logout</button>;
  } else {
    return (
      <Link href="/signIn">
        <a>Sign In</a>
      </Link>
    );
  }
};

export default SignIn;
