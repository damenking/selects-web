import React from 'react';
import Link from 'next/link';
import withAuth from '../firebase/withAuth.js';

type Props = {
  loggedIn: boolean;
  handleLogout: VoidFunction;
};

const SignIn: React.FunctionComponent<Props> = ({ loggedIn, handleLogout }) => {
  if (loggedIn) {
    return <button onClick={handleLogout}>Logout</button>;
  } else {
    return (
      <Link href="/signIn">
        <a>Sign In</a>
      </Link>
    );
  }
};

export default withAuth(SignIn);
