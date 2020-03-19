import { createContext } from 'react';
import { Address } from '../interfaces/';

const signOut = function(): void {};
const signIn = function(_a: string, _b: string): void {};
const updateCheckoutId = function(_a: string, _b: Address): void {};

const UserContext = createContext({
  user: {
    defaultAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'United States',
      zip: ''
    },
    email: '',
    displayName: ''
  },
  loggedIn: false,
  signIn,
  signOut,
  checkoutId: '',
  updateCheckoutId
});

export default UserContext;
