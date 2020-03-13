import React from 'react';
import Link from 'next/link';
import { Button } from '@shopify/polaris';
import { CartMajorMonotone } from '@shopify/polaris-icons';
import styles from './Layout.module.css';
import SignIn from './SignIn';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
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
          <Button icon={CartMajorMonotone} />
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
