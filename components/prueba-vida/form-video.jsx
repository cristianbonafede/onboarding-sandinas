import { useContext, useEffect, useState } from 'react';

import Camera from '../ui/camera';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormVideo = () => {
  const context = useContext(SolicitudContext);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  const onSubmit = (value) => {
    let nForm = { ...context.form };
    nForm.video = value;
    context.updateForm(nForm);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.camera) {
    return;
  }

  return (
    <Camera
      type="video"
      position="front"
      overlay="face"
      duration={4}
      onSubmit={onSubmit}
    />
  );
};

export default FormVideo;
