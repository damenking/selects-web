import { createContext } from 'react';
import { Address } from '../interfaces/';

const signOut = function (): void {};
const signIn = function (_a: string, _b: string): void {};
const updateCheckoutId = function (_a: string, _b: Address): void {};
const addFavorite = function (_a: string): void {};
const removeFavorite = function (_a: string): void {};

const UserContext = createContext({
  user: {
    id: '',
    defaultAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'United States',
      zip: '',
    },
    email: '',
    displayName: '',
    favorites: {
      product: [] as string[],
    },
  },
  loggedIn: false,
  signIn,
  signOut,
  checkoutId: '',
  updateCheckoutId,
  addFavorite,
  removeFavorite,
});

export default UserContext;
