import { createContext } from 'react';
import { Address, User } from '../interfaces/';

const signOut = function (): void {};
const signIn = function (_a?: string, _b?: string, _c?: string): void {};
const updateCheckoutId = function (_a: string, _b: Address): void {};
const addProductFavorite = function (_a: string): void {};
const removeProductFavorite = function (_a: string): void {};
const updateUserData = function (_a: User): void {};

const UserContext = createContext({
  user: {} as User,
  favorites: {
    product: [] as string[],
  },
  loggedIn: false,
  signIn,
  signOut,
  checkoutId: '',
  updateCheckoutId,
  addProductFavorite,
  removeProductFavorite,
  updateUserData,
});

export default UserContext;
