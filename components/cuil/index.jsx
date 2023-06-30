import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Highlight from '../ui/highlight';
import Instructions from '../ui/instructions';
import FormCuil from './form-cuil';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import classes from './index.module.scss';

const Cuil = () => {
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

      context.updateStep(router);
    };

    validateStep();
  }, [context.steps]);

  useEffect(() => {
    const getCuil = async () => {
      const response = await solicitud.getCuil();
      if (response.cuil) {
        const responseExistePersona = await solicitud.existePersona();
        if (responseExistePersona) {
          await context.nextStep(router);
        }
      } else {
        setVisible(true);
      }
    };

    if (context.step?.url === '/cuil') {
      getCuil();
    }
  }, [context.step]);

  const onFinish = async () => {
    await context.nextStep(router);
  };

  if (!visible) {
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/id-front.png"
        nextScreen={solicitud.screens.form}
      >
        Necesitamos que ingreses tu
        <Highlight primary>CUIL</Highlight> para poder continuar con el proceso.
      </Instructions>
      <FormCuil />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Cuil;
