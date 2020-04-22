import React, { useState, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { passwordResetByUrl } from '../../api/shopify/auth';
import UserContext from '../../components/UserContext';

const PasswordReset: NextPage = () => {
  const router = useRouter();
  const reset_url = router.query.reset_url as string;
  const { signIn } = useContext(UserContext);
  const [password, updatePassword] = useState('');

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePassword(value);
  };

  const handleResetSubmit = async () => {
    const { customerAccessToken } = await passwordResetByUrl(
      reset_url,
      password
    );
    signIn(undefined, undefined, customerAccessToken);
  };

  // Need to get usererrors or any error to display on failure
  return (
    <div>
      <h5>Reset your password</h5>
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleResetSubmit}>Submit</button>
    </div>
  );
};

export default PasswordReset;
