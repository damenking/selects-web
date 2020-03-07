import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const AboutPage: NextPage = () => {
  return (
    <Layout title="About Us">
      <h1>About</h1>
      <p>This is an about page!!!</p>
    </Layout>
  );
};

export default AboutPage;
