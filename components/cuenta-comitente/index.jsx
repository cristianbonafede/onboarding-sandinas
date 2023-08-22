import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import FormCuentaComitente from './form-cuenta-comitente';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Spinner from '../ui/spinner';
import classes from './index.module.scss';

const CuentaComitente = () => {
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
      context.changeScreen(solicitud.screens.form);
    };

    validateStep();
  }, [context.steps]);

  const onFinish = () => {
    context.nextStep(router);
  };

  if (!visible) {
    return <Spinner visible={true} />;
  }

  return (
    <div className={classes.cuentacomitente}>
      <Header />
      <FormCuentaComitente />
      <Checklist onFinish={onFinish} />
    </div>
  );
};
export default CuentaComitente;
