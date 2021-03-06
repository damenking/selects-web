import { createContext } from 'react';
import { Address, User, UserError, Product } from '../interfaces/';

const signOut = function (): void {};
const signIn = function (
  _a?: string,
  _b?: string,
  _c?: string,
  _d?: string
): Promise<UserError[]> {
  return new Promise((resolve) => resolve([]));
};
const updateCheckoutId = function (
  _a: string,
  _b?: Address | undefined
): void {};
const addProductFavorite = function (_a: string): void {};
const removeProductFavorite = function (_a: string): void {};
const updateUserData = function (_a: User): void {};
const setShowAddedToCart = function (
  _a: boolean,
  _b?: Product,
  _c?: string
): void {};

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
  loadingUser: true,
  showAddedToCart: true,
  setShowAddedToCart,
  lastProductAddedToCart: {} as Product,
  addedToCartPriceText: '',
});

export default UserContext;
