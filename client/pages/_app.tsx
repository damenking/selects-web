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
import { Address } from '../interfaces/';

import 'js-datepicker/dist/datepicker.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'flickity/css/flickity.css';
import '../styles.css';

class MyApp extends App {
  state = {
    user: {
      id: '',
      defaultAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        zip: '',
        country: '',
        company: '',
      },
      email: '',
      displayName: '',
      favorites: {
        product: [] as string[],
      },
    },
    loggedIn: false,
    checkoutId: '',
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const checkoutId = localStorage.getItem('checkoutId') || '';
    if (accessToken && accessToken !== '') {
      checkToken(accessToken).then((response) => {
        const { activeToken, user } = response;
        if (activeToken) {
          renewToken(accessToken).then((response) => {
            localStorage.setItem('accessToken', response.renewedToken);
          });
          this.setState({ loggedIn: true, user: user, checkoutId: checkoutId });
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

  signIn = async (userEmail: string, password: string) => {
    let checkoutId = localStorage.getItem('checkoutId') || '';
    const { accessToken, error } = await createToken(userEmail, password);
    if (!error) {
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

  addFavorite = (productId: string) => {
    const updatedFavorites = [...this.state.user.favorites.product];
    const updatedUser = { ...this.state.user };
    updatedUser.favorites = { ...this.state.user.favorites };
    updatedFavorites.push(productId);
    updatedUser.favorites.product = updatedFavorites;
    this.setState({ user: updatedUser });
  };

  removeFavorite = (productId: string) => {
    const updatedFavorites = [...this.state.user.favorites.product];
    const updatedUser = { ...this.state.user };
    updatedUser.favorites = { ...this.state.user.favorites };
    updatedFavorites.splice(updatedFavorites.indexOf(productId), 1);
    updatedUser.favorites.product = updatedFavorites;
    this.setState({ user: updatedUser });
  };

  updateCheckoutId = async (email: string, address: Address) => {
    const { checkoutId } = await createCheckout(email, address);
    this.setState({ checkoutId: checkoutId });
    localStorage.setItem('checkoutId', checkoutId);
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
            addFavorite: this.addFavorite,
            removeFavorite: this.removeFavorite,
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
