import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const EjemplarNoValido = () => {
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
          <div>
            No podemos validar tu identidad porque el DNI utilizado no coincide
            con el último ejemplar válido por RENAPER (Registro Nacional de las
            Personas). Podes verificar cuál es el ejemplar vigente de DNI desde{' '}
            <a
              href="https://tramites.renaper.gob.ar/mi_ejemplar/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#ff9340' }}
            >
              https://tramites.renaper.gob.ar/mi_ejemplar/
            </a>
          </div>
          <div>
            Por favor, asegurate de contar con el último ejemplar vigente y
            volvé a intentarlo más tarde. Si el problema persiste comunicate con{' '}
            <a
              href="mailto:altas@bindpagos.com.ar"
              style={{ color: '#ff9340' }}
            >
              altas@bindpagos.com.ar
            </a>
          </div>
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default EjemplarNoValido;
