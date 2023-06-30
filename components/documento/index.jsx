import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FiCamera, FiImage, FiRepeat } from 'react-icons/fi';

import CameraBlocked from '../ui/camera-blocked';
import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Highlight from './../ui/highlight';
import Instructions from './../ui/instructions';
import FormImages from './form-images';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import classes from './index.module.scss';

const Documento = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);
  const [colorPrimary, setColorPrimary] = useState();

  useEffect(() => {
    const validateStep = async () => {
      const redirect = await context.validateStep(router);
      if (redirect) {
        router.push(redirect);
        return;
      }

      try {
        // await startCamera();
      } catch (error) {
        context.changeScreen(solicitud.screens.cameraBlocked);
      } finally {
        setColorPrimary(sessionStorage.getItem('color-primary'));
        sessionStorage.removeItem('camera');
        setVisible(true);
        context.updateStep(router);
      }
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
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/id-front.png"
        nextScreen={solicitud.screens.form}
      >
        Para poder comenzar, necesitamos una foto del
        <Highlight primary>frente</Highlight>y
        <Highlight primary>dorso</Highlight> de tu documento. Las fotos deben
        ser nítidas y legibles.
        <div className={classes.list}>
          <div className={classes.item}>
            <div className={classes.icon} style={{ color: colorPrimary }}>
              <FiCamera />
            </div>
            Tomá una foto con tu celular
          </div>
          <div className={classes.item}>
            <div className={classes.icon} style={{ color: colorPrimary }}>
              <FiRepeat />
            </div>
            Podés cambiar la cámara para mejorar la calidad de la foto
          </div>
          <div className={classes.item}>
            <div className={classes.icon} style={{ color: colorPrimary }}>
              <FiImage />
            </div>
            Podés cargar una foto que ya tengas guardada
          </div>
        </div>
      </Instructions>
      <FormImages />
      <Checklist onFinish={onFinish} />
      <CameraBlocked />
    </div>
  );
};

export default Documento;
