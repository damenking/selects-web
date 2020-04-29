import React, { useState, useContext } from 'react';
import { NextPage } from 'next';
import UserContext from '../../components/UserContext';
import { triggerPasswordResetEmail } from '../../api/shopify/auth';
import TextInput from '../../components/TextInput';
import PrimaryButtom from '../../components/buttons/PrimaryButton';
import { createCustomer } from '../../api/shopify/customer';
import { CustomerInformation } from '../../interfaces/';

import styles from './signIn.module.css';

const SignIn: NextPage = () => {
  const { signIn } = useContext(UserContext);
  const [showRegister, updateShowRegister] = useState(false);
  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [phone, updatePhone] = useState('');
  const [email, updateEmail] = useState('');
  const [confirmEmail, updateConfirmEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');
  const [resetEmail, updateResetEmail] = useState('');

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

  const handleSignIn = () => {
    signIn(email, password, undefined);
  };

  const handleToggleShowRegister = (show: boolean) => {
    updateShowRegister(show);
  };

  const handleFirstNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateFirstName(value);
  };

  const handleLastNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateLastName(value);
  };

  const handlePhoneChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePhone(value);
  };

  const handleConfirmEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateConfirmEmail(value);
  };

  const handleConfirmPasswordChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateConfirmPassword(value);
  };

  const handleRegistrationSubmit = async () => {
    const customerObj: CustomerInformation = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    const { error } = await createCustomer(customerObj);
    if (!error) {
      signIn(email, password);
    }
  };

  // Need to get usererrors or any error to display on failure
  return (
    <div
      className={`${styles.containerDesktop} grid-desktop-layout-expandable`}
    >
      <div className={`${styles.panelContainer} col-span-4-offset-2`}>
        <div
          className={`${styles.toggleContainer} clickable font-family-apercu-medium`}
        >
          <div
            className={`${styles.toggleOption} ${
              !showRegister ? styles.toggleOptionSelected : ''
            }`}
            onClick={() => handleToggleShowRegister(false)}
          >
            SIGN IN
          </div>
          <div
            className={`${styles.toggleOption} ${
              showRegister ? styles.toggleOptionSelected : ''
            }`}
            onClick={() => handleToggleShowRegister(true)}
          >
            REGISTER
          </div>
        </div>
        {!showRegister && (
          <>
            <TextInput
              label="* Email"
              handleChange={handleEmailChange}
              value={email}
              inputType="text"
            />
            <TextInput
              label="* Password"
              handleChange={handlePasswordChange}
              value={password}
              inputType="password"
            />
            <div className={styles.forgotPassword}>
              <small
                className={`font-family-apercu-medium underlined clickable`}
              >
                Forgot your password?
              </small>
            </div>
            <PrimaryButtom handleClick={handleSignIn} text="Sign In" />
          </>
        )}

        {showRegister && (
          <>
            <TextInput
              label="* First Name"
              handleChange={handleFirstNameChange}
              value={firstName}
              inputType="text"
            />
            <TextInput
              label="* Last Name"
              handleChange={handleLastNameChange}
              value={lastName}
              inputType="text"
            />
            <TextInput
              label="* Phone"
              handleChange={handlePhoneChange}
              value={phone}
              inputType="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
            <TextInput
              label="* Email"
              handleChange={handleEmailChange}
              value={email}
              inputType="email"
            />
            <TextInput
              label="* Confirm Email"
              handleChange={handleConfirmEmailChange}
              value={confirmEmail}
              inputType="email"
            />
            <TextInput
              label="* Password"
              handleChange={handlePasswordChange}
              value={password}
              inputType="password"
            />

            <TextInput
              label="* Confirm Password"
              handleChange={handleConfirmPasswordChange}
              value={confirmPassword}
              inputType="password"
            />

            <PrimaryButtom
              handleClick={handleRegistrationSubmit}
              text="Register"
            />
          </>
        )}

        <input
          className="hidden"
          type="text"
          value={resetEmail}
          onChange={(e) => handleResetEmailChange(e)}
        />
        <button className="hidden" onClick={handleResetSubmit}>
          Password reset submit
        </button>
      </div>
    </div>
  );
};

export default SignIn;
