import Head from 'next/head';
import { Fragment } from 'react';

import SocialNetComercio from '../components/socialnet-comercio';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

const SocialNetComercioPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Prueba vida - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <SocialNetComercio />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default SocialNetComercioPage;
