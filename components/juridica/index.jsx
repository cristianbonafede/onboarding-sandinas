import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormJuridica from './form-juridica';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from '../ui/highlight';
import Spinner from '../ui/spinner';
import classes from './index.module.scss';

const Juridica = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const validateStep = async () => {
      const redirect = await context.validateStep(router);
      if (redirect) {
        router.push(redirect);
        return;
      }

      setVisible(true);
      context.updateStep(router);
    };

    validateStep();
  }, [context.steps]);

  const onFinish = async () => {
    await context.nextStep(router);
  };

  if (!visible) {
    return <Spinner visible={true} />;
  }

  return (
    <div className={classes.juridica}>
      <Header />
      <Instructions
        image="/images/agreement.png"
        nextScreen={solicitud.screens.form}
      >
        Es necesario que completes el
        <Highlight primary>siguiente formulario</Highlight>
        para que un agente de ventas se ponga en contacto con vos.
      </Instructions>
      <FormJuridica />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Juridica;
