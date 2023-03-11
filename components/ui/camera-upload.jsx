import { useContext, useEffect, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import classes from './camera-upload.module.scss';

const CameraUpload = (props) => {
  const { title, property } = props;

  const context = useContext(SolicitudContext);

  const [image, setImage] = useState();
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    const preview = context.form[property];
    if (preview) {
      setImage(preview);
    }
  }, [context.form]);

  const onClick = () => {
    if (hasCamera) {
      context.updateFormProperty(property);
      context.changeScreen(solicitud.screens.camera);
    }
  };

  return (
    <div>
      <div
        className={`${classes.camera} ${image && classes.preview}`}
        style={{ backgroundImage: image ? `url('${image}')` : 'none' }}
        onClick={onClick}
      >
        <div className={classes.instructions}>
          <div className={classes.icon}>
            <FiCamera />
          </div>
          <div className={classes.title}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CameraUpload;
