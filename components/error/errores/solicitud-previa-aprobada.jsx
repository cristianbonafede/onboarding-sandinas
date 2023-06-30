import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const SolicitudPreviaAprobada = () => {
  const router = useRouter();

  const onClickRetry = () => {
    redirect(router, '');
  };

  return (
    <LayoutErrorBase>
      <div>
        <div className={classes.title}>
          <Highlight primary>¡Ups! Algo salió mal</Highlight>
        </div>
        <div className={classes.description}>
          Ya contamos con una solicitud creada por la misma persona. Podes
          ingresar a (URL) para consultar tus datos o comunicarte con{' '}
          <a href="mailto:altas@bindpagos.com.ar" style={{ color: '#ff9340' }}>
            altas@bindpagos.com.ar
          </a>
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default SolicitudPreviaAprobada;
