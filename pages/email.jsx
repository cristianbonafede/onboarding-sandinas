import Head from 'next/head';
import { Fragment } from 'react';

import Email from './../components/email';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

const EmailPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Email - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Email />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default EmailPage;
