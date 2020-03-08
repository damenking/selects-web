import React, { useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { createCustomer } from '../api/shopify/customer';

const SignUp: NextPage = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [userErrors, updateUserErrors] = useState([]);
  const [error, updateError] = useState(false);

  interface UserError {
    field: string[];
    message: string;
  }

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateEmail(value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePassword(value);
  };

  const handleFirstNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateFirstName(value);
  };

  const handleLastNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateLastName(value);
  };

  const handleSubmit = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const { error, userErrors } = await createCustomer(
      email,
      password,
      firstName,
      lastName
    );
    updateError(error);
    updateUserErrors(userErrors);
  };

  return (
    <Layout title="Sign Up">
      <h1>Sign Up</h1>
      <label>first name</label>
      <input type="text" value={firstName} onChange={handleFirstNameChange} />
      <label>last name</label>
      <input type="text" value={lastName} onChange={handleLastNameChange} />
      <br />
      <label>email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button
        onClick={() => handleSubmit(email, password, firstName, lastName)}
      >
        Submit
      </button>
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
        Already have an account?{' '}
        <Link href="/signIn">
          <a>Sign In</a>
        </Link>
      </p>
    </Layout>
  );
};

export default SignUp;
