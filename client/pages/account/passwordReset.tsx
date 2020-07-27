import React, { useState } from 'react';
import { NextPage } from 'next';
import { triggerPasswordResetEmail } from '../../api/shopify/auth';
import RevealContent from '../../components/buttons/RevealContent';

const PasswordReset: NextPage = () => {
  const [email, updateEmail] = useState('');

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateEmail(value);
  };

  const handleResetSubmit = () => {
    triggerPasswordResetEmail(email);
  };

  // Need to get usererrors or any error to display on failure
  return (
    <div>
      <h5>Reset your password</h5>
      <label>Account Email:</label>
      <input type="email" value={email} onChange={handleEmailChange} />
      <br />
      <RevealContent text="Reset Submit" handleClick={handleResetSubmit}>
        <p>A password reset link has been sent to {email}</p>
        <a href="/account/signIn">Sign In</a>
      </RevealContent>
    </div>
  );
};

export default PasswordReset;
