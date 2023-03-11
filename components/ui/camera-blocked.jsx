import Image from 'next/image';
import { useContext } from 'react';

import Button from './button';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import classes from './camera-blocked.module.scss';

const CameraBlocked = () => {
  const context = useContext(SolicitudContext);

  const onClickReload = () => {
    window.location.reload();
  };

  if (context.screen !== solicitud.screens.cameraBlocked) {
    return;
  }

  return (
    <div className={classes.blocked}>
      <div className={classes.content}>
        <div className={classes.image}>
          <Image
            src="/images/no-video.png"
            alt="no-video"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.title}>Tu cámara esta bloqueada</div>
        <div className={classes.description}>
          Hacé clic en el ícono de cámara bloqueada en la barra de direcciones
          de tu navegador, permití el acceso a la cámara e intenta nuevamente.
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          block
          type="primary"
          text="Reintentar"
          onClick={onClickReload}
        />
      </div>
    </div>
  );
};

export default CameraBlocked;
