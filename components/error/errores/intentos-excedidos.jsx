import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';
import LayoutErrorBase from './layout-error-base';

const IntentosExcedidos = () => {
  return (
    <LayoutErrorBase>
      <div>
        <div className={classes.title}>
          <Highlight primary>¡Ups! Algo salió mal</Highlight>
        </div>
        <div className={classes.description}>
          Lamentablemente, superaste los intentos de validación de identidad
          máximos permitidos en un día.
        </div>
        <div className={classes.description}>
          Por favor, volvé a intentarlo en 24hs. Si el problema persiste
          comunicate con{' '}
          <a href="mailto:altas@bindpagos.com.ar" style={{ color: '#ff9340' }}>
            altas@bindpagos.com.ar
          </a>
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default IntentosExcedidos;
