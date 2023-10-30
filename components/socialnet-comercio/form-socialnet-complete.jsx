import { useContext, useEffect } from 'react';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormSocialnetComercio = () => {
  const context = useContext(SolicitudContext);

  useEffect(() => {
    async function getUrl() {
      const response = await solicitud.createAutenticacion();
      if (!response) {
        return;
      }

      window.location.replace(response.urlAutenticacion);
    }

    if (context.screen === solicitud.screens.form) {
      getUrl();
    }
  }, [context.screen]);

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return <div></div>;
};

export default FormSocialnetComercio;
