import Head from 'next/head';
import { Fragment } from 'react';

import Finalizar from './../components/finalizar';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

const FinalizarPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Finalizar - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Finalizar />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default FinalizarPage;
