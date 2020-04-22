import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import UserContext from '../../components/UserContext';
import { triggerPasswordResetEmail } from '../../api/shopify/auth';

const SignIn: NextPage = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [resetEmail, updateResetEmail] = useState('');
  const { signIn } = useContext(UserContext);

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateEmail(value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePassword(value);
  };

  const handleResetEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateResetEmail(value);
  };

  const handleResetSubmit = () => {
    triggerPasswordResetEmail(resetEmail);
  };

  // Need to get usererrors or any error to display on failure
  return (
    <div>
      <h1>Sign In</h1>
      <label>email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={() => signIn(email, password, undefined)}>Submit</button>
      <br />
      <hr />
      <p>
        DOn't have an account?{' '}
        <Link href="/account/signUp">
          <a>Sign Up</a>
        </Link>
      </p>
      <br />
      <p>Forgot your password?</p>
      <label>Email:</label>
      <input
        type="text"
        value={resetEmail}
        onChange={(e) => handleResetEmailChange(e)}
      />
      <button onClick={handleResetSubmit}>Password reset submit</button>
    </div>
  );
};

export default SignIn;
