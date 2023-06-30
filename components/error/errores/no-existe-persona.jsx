import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from '../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const NoExistePersona = () => {
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
          No podemos continuar porque usted no se encuentra registrado/a en
          nuestra base de clientes.
        </div>
        <div className={classes.description}>
          Te invitamos a que finalices el circuito en tu sucursal de cobro.
        </div>
        <div className={classes.description}>
          También, podés comunicarte al: 0810 666 0505, o chatear con BINDI:
          113420-9812.
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default NoExistePersona;
