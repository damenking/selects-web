import React from 'react';
import Navbar from './navbar/Navbar';
import Footer from './Footer';

// import styles from './Layout.module.css';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="max-width-2000"> {children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
