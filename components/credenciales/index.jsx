import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import FormCredenciales from './form-credenciales';
import classes from './index.module.scss';

const Credenciales = () => {
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
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.terminos}>
      <Header />
      <Instructions
        image="/images/login.png"
        vertical
        nextScreen={solicitud.screens.form}
      >
        Creamos una cuenta en Banco Industrial donde acreditaremos en línea tus
        cobros con QR. Creá tu{' '}
        <Highlight primary>usuario y contraseña</Highlight>
        para ingresar al Homebanking Bind24.
      </Instructions>
      <FormCredenciales />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Credenciales;
