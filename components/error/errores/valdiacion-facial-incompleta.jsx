import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';
import LayoutErrorBase from './layout-error-base';

const ValidacionFacialIncompleta = () => {
  const router = useRouter();

  const onClickRetry = () => {
    router.push('/prueba-vida');
  };

  return (
    <LayoutErrorBase>
      <div>
        <div className={classes.title}>
          <Highlight primary>¡Ups! Algo salió mal</Highlight>
        </div>
        <div className={classes.description}>
          No pudimos completar con éxito el reconocimiento facial. Por favor,
          volvé a intentarlo. Es posible que la grabación del video no fue lo
          suficientemente clara. Te recomendamos lo siguiente:
          <ul>
            <li>Ubicate en un lugar bien iluminado y con fondo claro</li>
            <li>Mantené una expresión neutra y sin sonreir</li>
            <li>Evitá usar anteojos y tapabocas </li>
          </ul>
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default ValidacionFacialIncompleta;
