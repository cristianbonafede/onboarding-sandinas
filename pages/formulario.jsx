import Head from 'next/head';
import { Fragment } from 'react';

import Card from '../components/ui/card';
import Layout from '../components/ui/layout';
import Formulario from './../components/formulario';

const TerminosPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Formulario - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Formulario />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default TerminosPage;
