import Head from 'next/head';
import { Fragment } from 'react';

import Card from '../components/ui/card';
import Layout from '../components/ui/layout';
import Juridica from './../components/juridica/index';

const JuridicaPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Persona Jurídica - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Juridica />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default JuridicaPage;
