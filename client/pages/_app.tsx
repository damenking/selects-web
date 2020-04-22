import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import Layout from '../components/Layout';
import 'react-dates/initialize';
import UserContext from '../components/UserContext';
import WindowDimensionsProvider from '../components/WindowDimensionsProvider';
import { checkToken, createToken, renewToken } from '../api/shopify/auth';
import { createCheckout } from '../api/shopify/checkout';
import { Address, User } from '../interfaces/';

import 'js-datepicker/dist/datepicker.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'flickity/css/flickity.css';
import '../styles.css';

class MyApp extends App {
  state = {
    user: {} as User,
    favorites: {
      product: [] as string[],
    },
    loggedIn: false,
    checkoutId: '',
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const checkoutId = localStorage.getItem('checkoutId') || '';
    if (accessToken && accessToken !== '') {
      checkToken(accessToken).then((response) => {
        const { activeToken, user, favorites } = response;
        if (activeToken) {
          renewToken(accessToken).then((response) => {
            localStorage.setItem('accessToken', response.renewedToken);
          });
          this.setState({
            loggedIn: true,
            user: user,
            checkoutId: checkoutId,
            favorites: favorites,
          });
        }
      });
    } else {
      this.setState({
        loggedIn: false,
        user: {
          defaultAddress: {
            firstName: '',
            lastName: '',
          },
          email: '',
          displayName: '',
        },
        checkoutId: checkoutId,
      });
    }
  };

  signIn = async (
    userEmail?: string,
    password?: string,
    accessToken?: string
  ) => {
    let checkoutId = localStorage.getItem('checkoutId') || '';
    let error;
    if (userEmail && password && !accessToken) {
      const response = await createToken(userEmail, password);
      error = response.error;
      accessToken = response.accessToken;
    }
    if (!error && accessToken) {
      const { user } = await checkToken(accessToken);
      localStorage.setItem('accessToken', accessToken);
      if (!checkoutId.length) {
        const response = await createCheckout(user.email, user.defaultAddress);
        checkoutId = response.checkoutId;
        localStorage.setItem('checkoutId', checkoutId);
      }
      this.setState({
        loggedIn: true,
        user: user,
        checkoutId: checkoutId,
      });
      Router.push('/');
    }
  };

  signOut = () => {
    this.setState({
      loggedIn: false,
      user: {},
    });
    localStorage.setItem('accessToken', '');
    Router.push('/account/signIn');
  };

  addProductFavorite = (productId: string) => {
    const updatedProductFavorites = [...this.state.favorites.product];
    const updatedFavorites = { ...this.state.favorites };
    updatedProductFavorites.push(productId);
    updatedFavorites.product = updatedProductFavorites;
    this.setState({ favorites: updatedFavorites });
  };

  removeProductFavorite = (productId: string) => {
    const updatedProductFavorites = [...this.state.favorites.product];
    const updatedFavorites = { ...this.state.favorites };
    updatedProductFavorites.splice(
      updatedProductFavorites.indexOf(productId),
      1
    );
    updatedFavorites.product = updatedProductFavorites;
    this.setState({ favorites: updatedFavorites });
  };

  updateCheckoutId = async (email: string, address: Address) => {
    const { checkoutId } = await createCheckout(email, address);
    this.setState({ checkoutId: checkoutId });
    localStorage.setItem('checkoutId', checkoutId);
  };

  updateUserData = (user: User) => {
    this.setState({ user: user });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <WindowDimensionsProvider>
        <UserContext.Provider
          value={{
            loggedIn: this.state.loggedIn,
            signOut: this.signOut,
            signIn: this.signIn,
            user: this.state.user,
            checkoutId: this.state.checkoutId,
            updateCheckoutId: this.updateCheckoutId,
            addProductFavorite: this.addProductFavorite,
            removeProductFavorite: this.removeProductFavorite,
            updateUserData: this.updateUserData,
            favorites: this.state.favorites,
          }}
        >
          <Head>
            <title>Selects Photo Supply</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </WindowDimensionsProvider>
    );
  }
}

export default MyApp;
