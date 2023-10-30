import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const Generico = () => {
  const router = useRouter();
  const type = sessionStorage.getItem('type');

  const onClickRetry = () => {
    redirect(router, '');
  };
  const renderText = () => {
    // Jubilo
    if (type == 'EmpadronamientoBIND') {
      return (
        <div>
          <div className={classes.title}>
            <Highlight primary>¡Ups! Algo salió mal</Highlight>
          </div>
          <div className={classes.description}>
            Ocurrió un error general. Por favor, volvé a intentarlo más tarde y si el problema persiste comunicate
            al 0810.666.0505 o bien acercate a tu sucursal más cercana
          </div>
          <div className={classes.action}>
            <Button type="primary" text="Reintentar" onClick={onClickRetry} />
          </div>
        </div>
      );
    }
    // Persona Fisica
    return (
      <div>
        <div className={classes.title}>
          <Highlight primary>¡Ups! Algo salió mal</Highlight>
        </div>
        <div className={classes.description}>
          Ha ocurrido un error general. Por favor, volvé a intentarlo más tarde
          y si el problema persiste comunicate con{' '}
          <a href="mailto:altas@bindpagos.com.ar" style={{ color: '#ff9340' }}>
            altas@bindpagos.com.ar
          </a>
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>

    );
  };
  return (
    <LayoutErrorBase>
      {renderText()}
    </LayoutErrorBase>

  );
};

export default Generico;
