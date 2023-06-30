import Head from 'next/head';

import CuentaComitente from '../components/cuenta-comitente';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

import { SolicitudContextProvider } from '../store/solicitud-context';

const CuentaComitentePage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Cuenta Comitente - Banco Industrial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <CuentaComitente />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default CuentaComitentePage;
