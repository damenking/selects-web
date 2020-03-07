import React, { useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { firebase } from '../firebase/firebase.js';
import Layout from '../components/Layout';

const SignIn: NextPage = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateEmail(value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePassword(value);
  };

  const handleSubmit = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Layout title="Sign In">
      <h1>Sign In</h1>
      <label>email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={() => handleSubmit(email, password)}>Submit</button>
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
