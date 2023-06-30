import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const PersonaNoEncontrada = () => {
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
            No podemos validar tu identidad ya que RENAPER (Registro Nacional de
            las Personas) no reconoce tu DNI.
          </div>
          <div>
            Por favor, asegurate de tener un DNI válido y volvé a intentarlo en
            24hs. Si el problema persiste comunicate con{' '}
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

export default PersonaNoEncontrada;
