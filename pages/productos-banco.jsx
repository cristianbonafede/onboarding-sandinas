import Head from 'next/head';
import { Fragment } from 'react';

import ProductosBanco from '../components/productos-banco';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

const ProductosBancoPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Productos del Banco - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <ProductosBanco />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default ProductosBancoPage;
