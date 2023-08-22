import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import CameraBlocked from '../ui/camera-blocked';
import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormVideo from './form-video';

import { solicitud } from '../../models/solicitud';
import { startCameras } from '../../services/camera';
import SolicitudContext from '../../store/solicitud-context';

import Spinner from '../ui/spinner';
import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const PruebaVida = () => {
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

      try {
        await startCameras();
      } catch (error) {
        context.changeScreen(solicitud.screens.cameraBlocked);
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
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/video.png"
        vertical
        nextScreen={solicitud.screens.camera}
      >
        A continuación, vamos a realizar una
        <Highlight primary>prueba de vida</Highlight>
        para validar tu identidad. Grabaremos un video de 4 segundos donde se
        tiene que ver tu rostro. 
        <Highlight primary>
          Ubicá tu rostro dentro de la marca indicada,
        </Highlight>
        mirá fijo a la cámara y evitá moverte.
      </Instructions>
      <FormVideo />
      <Checklist onFinish={onFinish} />
      <CameraBlocked />
    </div>
  );
};

export default PruebaVida;
