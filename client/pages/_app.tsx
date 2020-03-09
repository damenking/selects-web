import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import { checkToken, createToken, renewToken } from '../api/shopify/auth';

class MyApp extends App {
  state = {
    user: {},
    loggedIn: false
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'undefined') {
      checkToken(accessToken).then(response => {
        const { activeToken, user } = response;
        if (activeToken) {
          renewToken(accessToken).then(response => {
            localStorage.setItem('accessToken', response.renewedToken);
          });
          this.setState({ loggedIn: true, user: user });
        }
      });
    } else {
      this.setState({
        loggedIn: false,
        user: {}
      });
    }
  };

  signIn = async (userEmail: string, password: string) => {
    const { accessToken, error } = await createToken(userEmail, password);
    if (!error) {
      const { user } = await checkToken(accessToken);
      localStorage.setItem('accessToken', accessToken);
      this.setState({
        loggedIn: true,
        user: user
      });
      Router.push('/');
    }
  };

  signOut = () => {
    this.setState({
      loggedIn: false,
      user: {}
    });
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
          user: this.state.user
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    );
  }
}

export default MyApp;
