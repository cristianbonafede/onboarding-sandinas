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
    sessionStorage.removeItem('gestor');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('ref_id');
    sessionStorage.removeItem('step');
    sessionStorage.removeItem('otpReadonly');
  }, []);

  useEffect(() => {
    let { e, t, s, g, ref_id, m } = router.query;

    if (!e) {
      return;
    }

    sessionStorage.setItem('entidad', e);
    sessionStorage.setItem('type', t ?? '');
    sessionStorage.setItem('solicitud', s ?? '');
    sessionStorage.setItem('gestor', g ?? '');
    sessionStorage.setItem('ref_id', ref_id ?? '');
    sessionStorage.setItem('email', m ?? '');
    context.initialize();
  }, [router.query]);

  return (
    <Fragment>
      <Head>
        <title>BIND - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </Fragment>
  );
};

export default HomePage;
