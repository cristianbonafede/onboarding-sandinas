import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Highlight from '../ui/highlight';
import Instructions from '../ui/instructions';
import FormSocialnet from './form-socialnet-complete';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';
import Spinner from '../ui/spinner';

import classes from './index.module.scss';

const SocialNetComercio = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);
  const type = sessionStorage.getItem('type');

  useEffect(() => {
    const validateStep = async () => {
      const redirect = await context.validateStep(router);
      if (redirect) {
        router.push(redirect);
        return;
      }

      context.updateStep(router);
    };

    validateStep();
  }, [context.steps]);

  useEffect(() => {
    const checkEstado = async () => {
      if (context.screen == solicitud.screens.checklist) {
        setVisible(true);
        return;
      }

      const response = await solicitud.updateEstadoSimpleEnrollment(false);
      // if (!response) {
      //   return;
      // }
      setVisible(true);
    };

    if (context.step?.url === '/socialnet-comercio') {
      checkEstado();
    }
  }, [context.step]);

  const onFinish = async () => {
    await context.nextStep(router);
  };

  if (!visible) {
    return <Spinner visible={true} />;
  }

  return (
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/video.png"
        vertical
        nextScreen={solicitud.screens.form}
      >
        <div className={classes.instructions}>
          A continuación, te
          <Highlight primary>
            redirigiremos para realizar una prueba de vida
          </Highlight>
          y validar tu identidad. Seguí las instrucciones para continuar con el
          proceso.
        </div>
      </Instructions>
      <FormSocialnet />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default SocialNetComercio;
