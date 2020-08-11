import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import ErrorMessages from '../ErrorMessages';
import TextInput from '../TextInput';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { createAddress, updateAddress } from '../../api/shopify/customer';
import { Address } from '../../interfaces';

import styles from './AccountInfoAddressPane.module.css';

const AccountInfoAddressPane: React.FunctionComponent = () => {
  const { user, updateUserData } = useContext(UserContext);
  const defaultAddress = user.default_address;
  const [isEditing, updateIsEditing] = useState(false);
  const [errors, updateErrors] = useState([] as string[]);
  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [address1, updateAddress1] = useState('');
  const [address2, updateAddress2] = useState('');
  const [city, updateCity] = useState('');
  const [province, updateProvince] = useState('');
  const [zip, updateZip] = useState('');
  const [company, updateCompany] = useState('');
  const [phone, updatePhone] = useState('');

  useEffect(() => {
    user.default_address?.first_name &&
      updateFirstName(user.default_address?.first_name);
    user.default_address?.last_name &&
      updateLastName(user.default_address?.last_name);
    user.default_address?.address1 &&
      updateAddress1(user.default_address?.address1);
    user.default_address?.address2 &&
      updateAddress2(user.default_address?.address2);
    user.default_address?.city && updateCity(user.default_address?.city);
    user.default_address?.province &&
      updateProvince(user.default_address?.province);
    user.default_address?.zip && updateZip(user.default_address?.zip);
    user.default_address?.company &&
      updateCompany(user.default_address?.company);
    user.default_address?.phone && updatePhone(user.default_address?.phone);
  }, [user]);

  const handleToggleIsEditing = (editing: boolean) => {
    updateIsEditing(editing);
    if (!editing) {
      window.scroll({
        top: 0,
      });
    }
  };

  const handleFirstNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateFirstName(value);
  };

  const handleLastNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateLastName(value);
  };

  const handleAddress1Change = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateAddress1(value);
  };

  const handleAddress2Change = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateAddress2(value);
  };

  const handleCityChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateCity(value);
  };

  const handleProvinceChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateProvince(value);
  };

  const handleZipChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateZip(value);
  };

  const handleCompanyChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateCompany(value);
  };

  const handlePhoneChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updatePhone(value);
  };

  const handleProfileUpdateSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    if (!defaultAddress && token) {
      const addressArg: Address = {
        first_name: firstName,
        last_name: lastName,
        address1,
        address2,
        city,
        province,
        zip,
        company,
        phone,
      };
      const response = await createAddress(addressArg, token);
      if (response.error) {
        const formattedErrors = [] as string[];
        Object.keys(response.userErrors).forEach((key) => {
          response.userErrors[key].forEach((error: string) => {
            formattedErrors.push(`${key}: ${error}`);
          });
        });
        updateErrors(formattedErrors);
      } else {
        handleToggleIsEditing(false);
      }
    } else if (defaultAddress?.id && token) {
      const addressArg: Address = {
        id: defaultAddress.id,
        first_name: firstName,
        last_name: lastName,
        address1,
        address2,
        city,
        province,
        zip,
        company,
        phone,
      };
      const { error, address } = await updateAddress(addressArg, true, user.id);
      if (!error) {
        handleToggleIsEditing(false);
        const updatedUser = { ...user };
        updatedUser.default_address = address;
        updateUserData(updatedUser);
      }
    }
  };

  if (!isEditing) {
    return (
      <>
        <div className={styles.panelHeader}>
          <div className={styles.infoHeader}>
            <p>Default Address</p>
            <small
              onClick={() => handleToggleIsEditing(true)}
              className="font-family-apercu-medium underlined clickable"
            >
              Manage
            </small>
          </div>
        </div>
        {defaultAddress && (
          <div>
            <p>
              {defaultAddress.first_name} {defaultAddress.last_name}
            </p>
            <p>{defaultAddress.address1}</p>
            {defaultAddress.address2 && <p>{defaultAddress.address2}</p>}
            <p>
              {defaultAddress.city}, {defaultAddress.province}{' '}
              {defaultAddress.zip}
            </p>
            {defaultAddress.country && <p>{defaultAddress.country}</p>}
            {defaultAddress.company && <p>{defaultAddress.company}</p>}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div className={styles.panelHeader}>
        <p>Update Default Address</p>
      </div>
      <ErrorMessages className={styles.errorMessages} messages={errors} />
      <TextInput
        inputType="text"
        label="* First Name"
        value={firstName}
        handleChange={handleFirstNameChange}
      />
      <TextInput
        inputType="text"
        label="* Last Name"
        value={lastName}
        handleChange={handleLastNameChange}
      />
      <TextInput
        inputType="text"
        label="* Address Line 1"
        value={address1}
        handleChange={handleAddress1Change}
      />
      <TextInput
        inputType="text"
        label="Address Line 2"
        value={address2}
        handleChange={handleAddress2Change}
      />
      <TextInput
        inputType="text"
        label="* City"
        value={city}
        handleChange={handleCityChange}
      />
      <TextInput
        inputType="text"
        label="* State"
        value={province}
        handleChange={handleProvinceChange}
      />
      <TextInput
        inputType="text"
        label="* Zip"
        value={zip}
        handleChange={handleZipChange}
      />
      <TextInput
        inputType="text"
        label="Company"
        value={company}
        handleChange={handleCompanyChange}
      />
      <TextInput
        inputType="text"
        label="Phone"
        value={phone}
        handleChange={handlePhoneChange}
      />
      <div className={styles.updateButtonsContainer}>
        <PrimaryButton handleClick={handleProfileUpdateSubmit} text="Save" />
        <SecondaryButton
          handleClick={() => handleToggleIsEditing(false)}
          text="Cancel"
        />
      </div>
    </>
  );
};

export default AccountInfoAddressPane;
