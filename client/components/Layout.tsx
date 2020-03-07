import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Layout.module.css';
import SignIn from './SignIn';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Selects Photo Supply'
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
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
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span className={styles.test}>This is a red footer</span>
    </footer>
  </div>
);

export default Layout;
