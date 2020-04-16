import React, { useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { useContext } from 'react';
import UserContext from '../../components/UserContext';

const SignIn: NextPage = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const { signIn } = useContext(UserContext);

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateEmail(value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePassword(value);
  };

  // Need to get usererrors or any error to display on failure
  return (
    <div>
      <h1>Sign In</h1>
      <label>email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={() => signIn(email, password)}>Submit</button>
      <br />
      <hr />
      <p>
        DOn't have an account?{' '}
        <Link href="/account/signUp">
          <a>Sign Up</a>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
