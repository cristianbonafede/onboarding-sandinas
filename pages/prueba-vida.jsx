import Head from 'next/head';
import { Fragment } from 'react';

import PruebaVida from './../components/prueba-vida';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

const PruebaVidaPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Prueba de Vida - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <PruebaVida />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default PruebaVidaPage;
