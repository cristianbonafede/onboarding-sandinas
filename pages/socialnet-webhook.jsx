import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect } from 'react';

import Layout from '../components/ui/layout';

import { solicitud } from '../models/solicitud';
import SolicitudContext from '../store/solicitud-context';

const SocialnetWebhookPage = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  useEffect(() => {
    let { e, t, s, g, ref_id } = router.query;

    if (e && s) {
      sessionStorage.setItem('entidad', e);
      sessionStorage.setItem('solicitud', s ?? '');
      sessionStorage.setItem('type', t ?? '');
      sessionStorage.setItem('gestor', g ?? '');
      sessionStorage.setItem('ref_id', ref_id ?? '');
      context.initialize();
    }
  }, [router.query]);

  useEffect(() => {
    async function setStep() {
      context.nextStep(router, '/socialnet', solicitud.screens.checklist);
    }

    if (context.steps.length === 0) {
      setStep();
    }
  }, [context.steps]);

  return (
    <Fragment>
      <Head>
        <title>Socialnet - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout></Layout>
    </Fragment>
  );
};

export default SocialnetWebhookPage;
