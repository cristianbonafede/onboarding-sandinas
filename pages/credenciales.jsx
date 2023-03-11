import Head from 'next/head';
import { Fragment } from 'react';

import Credenciales from '../components/credenciales';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

const CredencialesPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Credenciales - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Credenciales />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default CredencialesPage;
