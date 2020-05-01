// Added this to the sign in page
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { createCustomer, createAddress } from '../../api/shopify/customer';
import {
  UserError,
  CustomerInformation,
  ShippingAddressInformation,
} from '../../interfaces/';
import UserContext from '../../components/UserContext';

const SignUp: NextPage = () => {
  const { signIn } = useContext(UserContext);
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [userErrors, updateUserErrors] = useState([]);
  const [error, updateError] = useState(false);
  const [addressLine1, updateAddressLine1] = useState('');
  const [addressLine2, updateAddressLine2] = useState('');
  const [city, updateCity] = useState('');
  const [state, updateState] = useState('');
  const [zip, updateZip] = useState('');
  const [phone, updatePhone] = useState('');
  const [company, updateCompany] = useState('');

  const handleCompanyChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateCompany(value);
  };

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

  const handleAddressLine1Change = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateAddressLine1(value);
  };

  const handleAddressLine2Change = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateAddressLine2(value);
  };

  const handleCityChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateCity(value);
  };

  const handleStateChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateState(value);
  };

  const handleZipChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateZip(value);
  };

  const handlePhoneChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePhone(value);
  };

  const handleSubmit = async (
    customerInformation: ShippingAddressInformation
  ) => {
    const { error, userErrors } = await createCustomer(customerInformation);
    updateError(error);
    updateUserErrors(userErrors);
    if (!error) {
      await signIn(customerInformation.email, customerInformation.password);
      const customerAccessToken = localStorage.getItem('accessToken');
      if (customerAccessToken) {
        createAddress(customerInformation, customerAccessToken);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <label>first name</label>
      <input type="text" value={firstName} onChange={handleFirstNameChange} />
      <label>last name</label>
      <input type="text" value={lastName} onChange={handleLastNameChange} />
      <br />
      <label>Address Line 1</label>
      <input
        type="text"
        value={addressLine1}
        onChange={handleAddressLine1Change}
      />
      <label>Address Line 2</label>
      <input
        type="text"
        value={addressLine2}
        onChange={handleAddressLine2Change}
      />
      <br />
      <label>City</label>
      <input type="text" value={city} onChange={handleCityChange} />
      <label>State</label>
      <input type="text" value={state} onChange={handleStateChange} />
      <label>Zip</label>
      <input type="text" value={zip} onChange={handleZipChange} />
      <br />
      <label>Phone</label>
      <input type="phone" value={phone} onChange={handlePhoneChange} />
      <br />
      <label>Company</label>
      <input type="company" value={company} onChange={handleCompanyChange} />
      <br />
      <label>email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label>password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button
        onClick={() =>
          handleSubmit({
            email,
            password,
            firstName,
            lastName,
            phone,
            company,
            address: {
              firstName,
              lastName,
              address1: addressLine1,
              address2: addressLine2,
              city,
              province: state,
              zip,
            },
          })
        }
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
        <Link href="/account/signIn">
          <a>Sign In</a>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
