import Head from 'next/head';
import { Fragment } from 'react';

import Cuil from '../components/cuil';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

const CuilPage = () => {
  return (
    <Fragment>
      <Head>
        <title>CUIL - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Cuil />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default CuilPage;
