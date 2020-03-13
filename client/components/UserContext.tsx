import { createContext } from 'react';

const signOut = function(): void {};
const signIn = function(_a: string, _b: string): void {};

const UserContext = createContext({
  user: {},
  loggedIn: false,
  signIn,
  signOut,
  checkoutId: ''
});

export default UserContext;
