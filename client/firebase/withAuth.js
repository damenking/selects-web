import React from 'react';
import router from 'next/router';
import { auth } from './firebase.js';
import fetch from 'isomorphic-unfetch';

const withAuth = Component => {
  return class extends React.Component {
    state = {
      loggedIn: false
    };

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({
            loggedIn: true
          });
        }
      });
    }

    handleLogout = async () => {
      this.setState({ loggedIn: false });
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };

    renderContent() {
      const { loggedIn } = this.state;
      return (
        <Component
          handleLogout={this.handleLogout}
          loggedIn={loggedIn}
          {...this.props}
        />
      );
    }

    render() {
      return <React.Fragment>{this.renderContent()}</React.Fragment>;
    }
  };
};

export default withAuth;
