import { useContext, useEffect } from 'react';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormSocialnet = () => {
  const context = useContext(SolicitudContext);

  useEffect(() => {
    async function getUrl() {
      const response = await solicitud.createEnrollment();
      if (!response) {
        return;
      }

      window.location.replace(response.urlEnrollment);
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

export default FormSocialnet;
