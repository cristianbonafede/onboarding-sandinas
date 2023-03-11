import Head from 'next/head';
import { Fragment } from 'react';

import Telefono from './../components/telefono';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

const TelefonoPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Telefono - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Telefono />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default TelefonoPage;
