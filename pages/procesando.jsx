import Head from 'next/head';
import { Fragment } from 'react';

import Procesando from '../components/procesando';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

const ProcesandoPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Procesando - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Procesando />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default ProcesandoPage;
