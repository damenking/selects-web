import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from '@shopify/polaris';
import { CartMajorMonotone } from '@shopify/polaris-icons';
import SignIn from './SignIn';

import styles from './Layout.module.css';

const Layout: React.FunctionComponent = ({ children }) => {
  const handleCartClick = () => {
    Router.push('/cart');
  };
  return (
    <div>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/products">
            <a>Products</a>
          </Link>{' '}
          | <SignIn />
          <Button icon={CartMajorMonotone} onClick={() => handleCartClick()} />
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span className={styles.test}>
          This is a red footer with a third party font
        </span>
      </footer>
    </div>
  );
};

export default Layout;
