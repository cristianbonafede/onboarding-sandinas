import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from '../../ui/highlight';

import classes from './../index.module.scss';
import LayoutErrorBase from './layout-error-base';

const FalloParcialReconocimientoFacial = () => {
  const router = useRouter();

  const onClickRetry = () => {
    router.push('/socialnet');
  };

  return (
    <LayoutErrorBase>
      <div>
        <div className={classes.title}>
          <Highlight primary>¡Ups! Algo salió mal</Highlight>
        </div>
        <div className={classes.description}>
          Lamentablemente, no hemos podido validar tu identidad.
        </div>
        <div className={classes.description}>
          Por favor, reintentá nuevamente.
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default FalloParcialReconocimientoFacial;
