import React, { useContext, useState, useEffect } from 'react';
import { NextPage } from 'next';
import UserContext from '../../components/UserContext';
import { updateCustomer } from '../../api/shopify/customer';
import { User } from '../../interfaces/';

const FavoritesPage: NextPage = () => {
  const { user, updateUserData } = useContext(UserContext);
  const [userFirstName, updateUserFirstName] = useState('');
  const [userLastName, updateUserLastName] = useState('');
  const [userEmail, updateUserEmail] = useState('');

  useEffect(() => {
    user.first_name && updateUserFirstName(user.first_name);
    user.last_name && updateUserLastName(user.last_name);
    user.email && updateUserEmail(user.email);
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

  const handleEmailNameChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    updateUserEmail(value);
  };

  return (
    <div>
      <p>This is a profile page!!!</p>
      <br />
      <br />
      <label>First Name: </label>
      <input
        type="text"
        value={userFirstName}
        onChange={handleFirstNameChange}
      />
      <label>Last Name: </label>
      <input type="text" value={userLastName} onChange={handleLastNameChange} />
      <label>Email: </label>
      <input type="text" value={userEmail} onChange={handleEmailNameChange} />
      <br />
      <button onClick={handleProfileUpdateSubmit}>Update</button>
    </div>
  );
};

export default FavoritesPage;
