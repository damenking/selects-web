import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Router from 'next/router';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import { checkToken, createToken, renewToken } from '../api/shopify/auth';
import { createCheckout } from '../api/shopify/checkout';

import '@shopify/polaris/styles.css';
import 'js-datepicker/dist/datepicker.min.css';

class MyApp extends App {
  state = {
    user: {},
    loggedIn: false,
    checkoutId: ''
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const checkoutId = localStorage.getItem('checkoutId') || '';
    if (accessToken && accessToken !== '') {
      checkToken(accessToken).then(response => {
        const { activeToken, user } = response;
        if (activeToken) {
          renewToken(accessToken).then(response => {
            localStorage.setItem('accessToken', response.renewedToken);
          });
          this.setState({ loggedIn: true, user: user, checkoutId: checkoutId });
        }
      });
    } else {
      this.setState({
        loggedIn: false,
        user: {},
        checkoutId: checkoutId
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
        const response = await createCheckout();
        checkoutId = response.checkoutId;
        localStorage.setItem('checkoutId', checkoutId);
      }
      this.setState({
        loggedIn: true,
        user: user,
        checkoutId: checkoutId
      });
      Router.push('/');
    }
  };

  signOut = () => {
    this.setState({
      loggedIn: false,
      user: {}
    });
    localStorage.setItem('accessToken', '');
    Router.push('/signIn');
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          signOut: this.signOut,
          signIn: this.signIn,
          user: this.state.user,
          checkoutId: this.state.checkoutId
        }}
      >
        <Head>
          <title>Selects Photo Supply</title>
        </Head>
        <AppProvider i18n={enTranslations}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </UserContext.Provider>
    );
  }
}

export default MyApp;
