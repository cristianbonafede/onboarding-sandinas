import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';
import LayoutErrorBase from './layout-error-base';

const IntentosExcedidosOtpEmail = () => {
  const router = useRouter();

  const onClickRetry = () => {
    const entidad = sessionStorage.getItem('entidad');
    const type = sessionStorage.getItem('type');
    router.push(`/?e=${entidad}&t=${type}`);
  };

  return (
    <LayoutErrorBase>
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ups! Algo salió mal</Highlight>
      </div>
      <div className={classes.description}>
        <div>
          Lamentablemente, superaste la cantidad máxima de intentos de
          validación de tu e-mail. Es posible que haya ocurrido alguno de los
          siguientes problemas:
          <ul>
            <li>Ingresaste una dirección de correo electrónico incorrecta.</li>
            <li>
              El código de validación llegó a tu bandeja de Spam o correo no
              deseado.
            </li>
          </ul>
        </div>
        <div>
          Por favor, volvé a intentarlo más tarde. Si el problema persiste
          comunicate con{' '}
          <a href="mailto:soluciones@sandinas.com.ar" style={{ color: '#ff9340' }}>
          soluciones@sandinas.com.ar
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

export default IntentosExcedidosOtpEmail;
