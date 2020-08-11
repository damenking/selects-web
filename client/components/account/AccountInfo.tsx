import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../components/UserContext';
import { updateCustomer } from '../../api/shopify/customer';
import { User } from '../../interfaces';
import { triggerPasswordResetEmail } from '../../api/shopify/auth';
import TextInput from '../TextInput';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import Checkbox from '../Checkbox';
import RevealContent from '../buttons/RevealContent';
import ErrorMessages from '../ErrorMessages';
import AccountInfoAddressPane from './AccountInfoAddressPane';

import styles from './AccountInfo.module.css';

const AccountInfo: React.FunctionComponent = () => {
  const { user, updateUserData } = useContext(UserContext);
  const [userFirstName, updateUserFirstName] = useState('');
  const [userLastName, updateUserLastName] = useState('');
  const [userEmail, updateUserEmail] = useState('');
  const [userPhone, updateUserPhone] = useState('');
  // Sub preference should be pulled from use once I know what newsletter
  // subscribed is.  For now just a controlled component...
  const [newsletterSubcribed, updateNewsletterSubscribed] = useState(false);
  const [errors, updateErrors] = useState([] as string[]);
  const [isEditing, updateIsEditing] = useState(false);

  useEffect(() => {
    user.first_name && updateUserFirstName(user.first_name);
    user.last_name && updateUserLastName(user.last_name);
    user.email && updateUserEmail(user.email);
    user.phone && updateUserPhone(user.phone);
  }, [user]);

  const handleProfileUpdateSubmit = async () => {
    const updateFields = {} as User;
    if (user.first_name && userFirstName !== user.first_name) {
      updateFields.first_name = userFirstName;
    }
    if (user.last_name && userLastName !== user.last_name) {
      updateFields.last_name = userLastName;
    }
    if (user.email && userEmail !== user.email) {
      updateFields.email = userEmail;
    }
    if (user.phone && userPhone !== user.phone) {
      updateFields.phone = userPhone;
    }
    const response = await updateCustomer(user.id, updateFields);
    if (response.error) {
      const formattedErrors = [] as string[];
      Object.keys(response.errors).forEach((key) => {
        response.errors[key].forEach((error: string) => {
          formattedErrors.push(`${key}: ${error}`);
        });
      });
      updateErrors(formattedErrors);
    } else {
      updateUserData(response.user);
      handleToggleIsEditing(false);
    }
  };

  const handleFirstNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateUserFirstName(value);
  };

  const handleLastNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateUserLastName(value);
  };

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateUserEmail(value);
  };

  const handlePhoneChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateUserPhone(value);
  };

  const handleResetSubmit = () => {
    triggerPasswordResetEmail(user.email);
  };

  const handleUpdateNewsletterSubscribedChange = (
    e: React.SyntheticEvent
  ): void => {
    const { checked } = e.target as HTMLInputElement;
    updateNewsletterSubscribed(checked);
  };

  const handleToggleIsEditing = (editing: boolean) => {
    updateIsEditing(editing);
    if (!editing) {
      window.scroll({
        top: 0,
      });
    }
  };

  if (!isEditing) {
    return (
      <div className={styles.contentContainer}>
        <div className={styles.leftPanelContainer}>
          <div className={styles.panelHeader}>
            <div className={styles.infoHeader}>
              <p>Account Info</p>
              <small
                onClick={() => handleToggleIsEditing(true)}
                className="font-family-apercu-medium underlined clickable"
              >
                Manage
              </small>
            </div>
          </div>
          <p>
            {user.first_name} {user.last_name}
          </p>
          <small>{user.email}</small>
        </div>
        <div className={styles.rightPanelContainer}>
          <AccountInfoAddressPane />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.contentContainer}>
      <div className={styles.leftPanelContainer}>
        <div className={styles.panelHeader}>
          <p>Update Information</p>
        </div>
        <ErrorMessages className={styles.errorMessages} messages={errors} />
        <TextInput
          inputType="text"
          label="* First Name"
          value={userFirstName}
          handleChange={handleFirstNameChange}
        />
        <TextInput
          inputType="text"
          label="* Last Name"
          value={userLastName}
          handleChange={handleLastNameChange}
        />
        <TextInput
          inputType="tel"
          label="* Phone"
          value={userPhone}
          handleChange={handlePhoneChange}
        />
        <TextInput
          inputType="email"
          label="* Email"
          value={userEmail}
          handleChange={handleEmailChange}
        />
        <Checkbox
          isChecked={newsletterSubcribed}
          handleChange={handleUpdateNewsletterSubscribedChange}
          label="Subscribe to Newsletter"
          className={styles.subcribeCheckbox}
        />
        <RevealContent
          text="Reset Password"
          handleClick={handleResetSubmit}
          textClass={styles.resetText}
        >
          <p>A password reset link has been sent to {user.email}</p>
        </RevealContent>
        <div className={styles.updateButtonsContainer}>
          <PrimaryButton handleClick={handleProfileUpdateSubmit} text="Save" />
          <SecondaryButton
            handleClick={() => handleToggleIsEditing(false)}
            text="Cancel"
          />
        </div>
      </div>
      <div className={styles.rightPanelContainer}>
        <AccountInfoAddressPane />
      </div>
    </div>
  );
};

export default AccountInfo;
