import Head from 'next/head';
import { Fragment } from 'react';

import Error from '../components/error';

const ErrorPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Ups - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Error />
    </Fragment>
  );
};

export default ErrorPage;
