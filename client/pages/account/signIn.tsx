import React, { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import UserContext from '../../components/UserContext';
import { triggerPasswordResetEmail } from '../../api/shopify/auth';
import TextInput from '../../components/TextInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { createCustomer } from '../../api/shopify/customer';
import { CustomerInformation, UserError } from '../../interfaces/';
import { checkIsMobile } from '../../components/WindowDimensionsProvider';
import ErrorMessages from '../../components/ErrorMessages';
import Checkbox from '../../components/Checkbox';

import styles from './signIn.module.css';

const SignIn: NextPage = () => {
  const router = useRouter();
  const route = router.query.route as string;
  const { signIn } = useContext(UserContext);
  const isMobile = checkIsMobile(750);
  const [showRegister, updateShowRegister] = useState(false);
  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [phone, updatePhone] = useState('');
  const [email, updateEmail] = useState('');
  const [confirmEmail, updateConfirmEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');
  const [resetEmail, updateResetEmail] = useState('');
  const [orderNumber, updateOrderNumber] = useState('');
  const [orderEmail, updateOrderEmail] = useState('');
  const [errors, updateErrors] = useState([] as string[]);
  // Sub preference should be pulled from use once I know what newsletter
  // subscribed is.  For now just a controlled component...
  const [newsletterSubcribed, updateNewsletterSubscribed] = useState(false);

  useEffect(() => {
    updateFirstName('');
    updateLastName('');
    updateEmail('');
    updateConfirmEmail('');
    updatePassword('');
    updateConfirmPassword('');
    updatePhone('');
  }, [showRegister]);

  const handleOrderNumberChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateOrderNumber(value);
  };

  const handleOrderEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateOrderEmail(value);
  };

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

  const handleSignIn = async () => {
    const userErrors = await signIn(email, password, undefined, route);
    const messages = userErrors.map((error) => {
      if ((error.code = 'UNIDENTIFIED_CUSTOMER')) {
        return 'Your email or password is incorrect.';
      }
      return error.message;
    });
    updateErrors(messages);
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
    const { error, userErrors } = await createCustomer(customerObj);
    const messages = userErrors.map((error: UserError) => {
      return error.message;
    });
    if (error && !userErrors.length) {
      updateErrors(['Error registering account. Please try again shortly.']);
    } else {
      updateErrors(messages);
    }
    if (!error) {
      signIn(email, password, undefined, route);
    }
  };

  const checkRegistrationSubmitIsDisabled = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      email !== confirmEmail ||
      !phone ||
      !password ||
      password !== confirmPassword
    ) {
      return true;
    }
    return false;
  };

  const checkOrderCheckIsDisabled = () => {
    if (!orderEmail || !orderNumber) {
      return true;
    }
    return false;
  };

  const checkSignInSubmitIsDisabled = () => {
    if (!email || !password) {
      return true;
    }
    return false;
  };

  const handleupdateNewsletterSubscribedChange = (
    e: React.SyntheticEvent
  ): void => {
    const { checked } = e.target as HTMLInputElement;
    updateNewsletterSubscribed(checked);
  };

  // Need to get usererrors or any error to display on failure
  if (isMobile) {
    return (
      <div className={`${styles.containerMobile} grid-mobile-layout`}>
        <div className={`${styles.panelContainerMobile} col-span-4`}>
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
          <ErrorMessages messages={errors} className={styles.errorContainer} />
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
              <PrimaryButton
                handleClick={handleSignIn}
                text="Sign In"
                isDisabled={checkSignInSubmitIsDisabled()}
              />
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
              <Checkbox
                isChecked={newsletterSubcribed}
                handleChange={handleupdateNewsletterSubscribedChange}
                label="Subscribe to Newsletter"
                className={styles.subcribeCheckbox}
              />
              <PrimaryButton
                handleClick={handleRegistrationSubmit}
                text="Register"
                isDisabled={checkRegistrationSubmitIsDisabled()}
              />
            </>
          )}
        </div>

        <div className={`${styles.panelContainerMobile} col-span-4`}>
          <div
            className={`${styles.checkStatusHeaderContainer} clickable font-family-apercu-medium`}
          >
            CHECK ORDER STATUS
          </div>
          <TextInput
            label="* Order Number"
            handleChange={handleOrderNumberChange}
            value={orderNumber}
            inputType="text"
          />
          <TextInput
            label="* Order Email"
            handleChange={handleOrderEmailChange}
            value={orderEmail}
            inputType="text"
          />
          <div className={styles.checkOrderSubmitContainer}>
            <SecondaryButton
              handleClick={handleRegistrationSubmit}
              text="Check"
              isDisabled={checkOrderCheckIsDisabled()}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`grid-desktop-layout-expandable-2`}>
      <div className={`${styles.panelContainerLeft} col-span-4-offset-2`}>
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
        <div className={styles.divider}></div>
        <ErrorMessages messages={errors} className={styles.errorContainer} />
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
                Forgot Password?
              </small>
            </div>
            <PrimaryButton
              handleClick={handleSignIn}
              text="Sign In"
              isDisabled={checkSignInSubmitIsDisabled()}
            />
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
            <Checkbox
              isChecked={newsletterSubcribed}
              handleChange={handleupdateNewsletterSubscribedChange}
              label="Subscribe to Newsletter"
              className={styles.subcribeCheckbox}
            />
            <PrimaryButton
              handleClick={handleRegistrationSubmit}
              text="Register"
              isDisabled={checkRegistrationSubmitIsDisabled()}
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

      <div className={`${styles.panelContainerRight} col-span-4`}>
        <div
          className={`${styles.checkStatusHeaderContainer} clickable font-family-apercu-medium`}
        >
          CHECK ORDER STATUS
        </div>
        <TextInput
          label="* Order Number"
          handleChange={handleOrderNumberChange}
          value={orderNumber}
          inputType="text"
        />
        <TextInput
          label="* Order Email"
          handleChange={handleOrderEmailChange}
          value={orderEmail}
          inputType="text"
        />
        <div className={styles.checkOrderSubmitContainer}>
          <SecondaryButton
            handleClick={handleRegistrationSubmit}
            text="Check"
            isDisabled={checkOrderCheckIsDisabled()}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
