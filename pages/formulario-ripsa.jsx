import Head from 'next/head';
import { Fragment } from 'react';

import Formulario from '../components/formulario-ripsa';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

const FormularioRipsaPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Formulario - Banco Industrial</title>
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

export default FormularioRipsaPage;
