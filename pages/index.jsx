import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect } from 'react';

import SolicitudContext from './../store/solicitud-context';

import Home from './../components/home/index';
import Layout from './../components/ui/layout';

const HomePage = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  useEffect(() => {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('solicitud');
    sessionStorage.removeItem('step');
    sessionStorage.removeItem('otpReadonly');
  }, []);

  useEffect(() => {
    let { e, t, s } = router.query;

    if (!e) {
      return;
    }

    sessionStorage.setItem('entidad', e);
    sessionStorage.setItem('type', t ?? '');
    sessionStorage.setItem('solicitud', s ?? '');
    context.initialize();
  }, [router.query]);

  return (
    <Fragment>
      <Head>
        <title>Onboarding - Soluciones Andinas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </Fragment>
  );
};

export default HomePage;
