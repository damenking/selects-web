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
    const response = await updateCustomer(user.id, updateFields);
    updateUserData(response.user);
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

  const handleupdateNewsletterSubscribedChange = (
    e: React.SyntheticEvent
  ): void => {
    const { checked } = e.target as HTMLInputElement;
    updateNewsletterSubscribed(checked);
  };
  return (
    <div className={styles.contentContainer}>
      <div className={styles.leftPanelContainer}>
        <div className={styles.panelHeader}>
          <p>Update Information</p>
        </div>
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
          handleChange={handleupdateNewsletterSubscribedChange}
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
            handleClick={() => console.warn('cancel')}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
