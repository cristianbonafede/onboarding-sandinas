import Head from 'next/head';
import { Fragment } from 'react';

import Card from '../components/ui/card';
import Layout from '../components/ui/layout';
import SocialNet from './../components/socialnet';

const SocialnetPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Socialnet - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <SocialNet />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default SocialnetPage;
