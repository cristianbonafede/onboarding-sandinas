import { useContext } from 'react';

import Camera from './../ui/camera';
import CameraUpload from './../ui/camera-upload';
import Form from './../ui/form';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';
import { rotateImage } from './../../services/images';

const FormImages = () => {
  const context = useContext(SolicitudContext);

  const onCameraSubmit = async (value, isMobile = null) => {
    if (isMobile) {
      value = await rotateImage(value, false);
    }

    let nForm = { ...context.form };
    nForm[context.formProperty] = value;

    context.updateForm(nForm);
    context.changeScreen(solicitud.screens.form);
  };

  const onSubmit = () => {
    if (!context.form.frente || !context.form.dorso) {
      return;
    }

    context.changeScreen(solicitud.screens.checklist);
  };

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
    </Form>
  );
};

export default FormImages;
