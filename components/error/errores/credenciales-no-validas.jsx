import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';
import LayoutErrorBase from './layout-error-base';

const CredencialesNoValidas = () => {
  const router = useRouter();

  const onClickRetry = () => {
    router.push('/credenciales');
  };

  return (
    <LayoutErrorBase>
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ups! Algo salió mal</Highlight>
      </div>
      <div className={classes.description}>
        Las credenciales ingresadas no respetan las condiciones necesarias. Por
        favor intenta con unas diferentes.
      </div>
      <div className={classes.action}>
        <Button type="primary" text="Reintentar" onClick={onClickRetry} />
      </div>
    </div>
  </LayoutErrorBase>
  );
};

export default CredencialesNoValidas;
