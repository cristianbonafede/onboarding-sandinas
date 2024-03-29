import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormEmail from './form-email';
import FormOtp from './form-otp';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Spinner from '../ui/spinner';
import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const Email = () => {
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

  const renderText = () => {
    // Jubilo
    if (type == 'WebPagos') {
      return (
        <div>
          Ahora necesitamos
          <Highlight primary>validar tu correo electrónico</Highlight> al que
          enviaremos información sobre tus{' '}
          <Highlight primary>facturas y comprobantes de pago.</Highlight>
        </div>
      );
    }

    return (
      <div>
        Ahora necesitamos que ingreses tu
        <Highlight primary>correo electrónico</Highlight> que usaremos de
        contacto. Te enviaremos un
        <Highlight primary>código numérico</Highlight>para validar que sea
        correcto.
      </div>
    );
  };
  return (
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/email.png"
        nextScreen={solicitud.screens.form}
      >
        {renderText()}
      </Instructions>
      <FormEmail />
      <FormOtp />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Email;
