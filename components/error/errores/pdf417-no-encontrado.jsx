import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const Pdf417NoEncontrado = () => {
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
          Tenemos problemas para leer tu DNI. Por favor, asegurate que la
          captura sea clara y volvé a intentarlo. Podés cambiar la cámara para
          mejorar la calidad de la foto.
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default Pdf417NoEncontrado;
