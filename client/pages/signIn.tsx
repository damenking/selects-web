import React, { useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
// import { firebase } from '../firebase/firebase.js';
import Layout from '../components/Layout';
import { signIn } from '../api/shopify/auth';

interface UserError {
  field: string[];
  message: string;
}

const SignIn: NextPage = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [error, updateError] = useState(false);
  const [userErrors, updateUserErrors] = useState([]);

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateEmail(value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePassword(value);
  };

  const handleSubmit = async (email: string, password: string) => {
    const { error, accessToken, userErrors } = await signIn(email, password);
    if (error) {
      updateError(true);
      updateUserErrors(userErrors);
    } else {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userToken', accessToken);
    }
  };

  return (
    <Layout title="Sign In">
      <h1>Sign In</h1>
      <label>email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={() => handleSubmit(email, password)}>Submit</button>
      <br />
      <div>
        <ul>
          {error && userErrors.length === 0 && <li>Error creating user</li>}
          {userErrors.map((userError: UserError) => {
            return <li>{userError.message}</li>;
          })}
        </ul>
      </div>
      <hr />
      <p>
        DOn't have an account?{' '}
        <Link href="/signUp">
          <a>Sign Up</a>
        </Link>
      </p>
    </Layout>
  );
};

export default SignIn;
