import { SolicitudContextProvider } from './../store/solicitud-context';

import '../styles/globals.scss';

import '../styles/buttons.scss';
import '../styles/forms.scss';
import '../styles/inputs.scss';
import '../styles/modals.scss';
import '../styles/selects.scss';

function MyApp({ Component, pageProps }) {
  return (
    <SolicitudContextProvider>
      <Component {...pageProps} />
    </SolicitudContextProvider>
  );
}

export default MyApp;
