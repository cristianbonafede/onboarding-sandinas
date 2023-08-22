import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormJubilo from './form-jubilo';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Spinner from '../ui/spinner';
import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const Formulario = () => {
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
    <div className={classes.formulario}>
      <Header />
      <Instructions
        image="/images/agreement.png"
        vertical
        nextScreen={solicitud.screens.form}
      >
        Para terminar, necesitamos que aceptes nuestros
        <Highlight primary>términos y condiciones</Highlight>
      </Instructions>
      <FormJubilo />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Formulario;
