import Image from 'next/image';
import { useContext, useState } from 'react';

import Alert from './../ui/alert';
import Camera from './../ui/camera';
import CameraUpload from './../ui/camera-upload';
import Form from './../ui/form';
import FormDocumento from './form-documento';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';
import { rotateImage } from './../../services/images';

import classes from './form-images.module.scss';

const FormImages = () => {
  const context = useContext(SolicitudContext);

  const [intentos, setIntentos] = useState(0);
  const [retry, setRetry] = useState(false);

  const onCameraSubmit = async (value, isMobile = null) => {
    setRetry(false);

    if (isMobile) {
      value = await rotateImage(value, false);
    }

    let nForm = { ...context.form };
    nForm[context.formProperty] = value;

    context.updateForm(nForm);
    context.changeScreen(solicitud.screens.form);
  };

  const onSubmit = async () => {
    if (!context.form.frente || !context.form.dorso) {
      return;
    }

    const response = await solicitud.create(
      context.form.frente,
      context.form.dorso
    );

    if (response.error) {
      if (response.codigo !== 'PDF417_NO_ENCONTRADO') {
        window.location.replace(`error?code=${response.codigo}`);
      } else {
        setIntentos(intentos + 1);
        setRetry(true);
      }

      return;
    }

    const solicitudId = response.data.id;
    sessionStorage.setItem('solicitud', solicitudId);

    if (sessionStorage.getItem('gestor')) {
      await solicitud.updateGestor();
    }

    if (sessionStorage.getItem('email')) {
      await solicitud.updateEmail(sessionStorage.getItem('email'));
    }
    if (sessionStorage.getItem('ref_id')) {
      await solicitud.updateRef_Id();
    }

    context.changeScreen(solicitud.screens.checklist);
  };

  if (intentos === 3) {
    return <FormDocumento />;
  }

  if (context.screen === solicitud.screens.camera) {
    return (
      <Camera
        type="photo"
        position="back"
        overlay="card"
        upload
        onSubmit={onCameraSubmit}
      />
    );
  }

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form centered onSubmit={onSubmit}>
      <CameraUpload title="Frente" property="frente" />
      <CameraUpload title="Dorso" property="dorso" />

      {retry && (
        <Alert type="warning" onClose={() => setRetry(false)}>
          Las imágenes no son claras. Por favor, intenta nuevamente con otras
          fotos.
        </Alert>
      )}

      <div className={classes.footer}>
        <div className={classes.image}>
          <Image
            src="/images/renaper.png"
            alt="logo del Renaper"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.text}>
          Al continuar, aceptás que comparemos tus datos con el Registro
          Nacional de las Personas (RENAPER).
        </div>
      </div>
    </Form>
  );
};

export default FormImages;
