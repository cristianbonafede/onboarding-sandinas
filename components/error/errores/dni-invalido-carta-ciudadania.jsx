import { useRouter } from 'next/router';

import Button from './../../ui/button';
import Highlight from './../../ui/highlight';
import LayoutErrorBase from './layout-error-base';

import { redirect } from '../../../services/error';

import classes from './../index.module.scss';

const DocumentoInvalidoCartaCiudadania = () => {
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
          No pudimos validar tu identidad porque Renaper (Registro Nacional de
          las Personas) indica que tu DNI es inválido por Carta de Ciudadanía.
          Por favor, contactate con Renaper para validarlo
          (https://www.argentina.gob.ar/interior/renaper).
        </div>
        <div className={classes.action}>
          <Button type="primary" text="Reintentar" onClick={onClickRetry} />
        </div>
      </div>
    </LayoutErrorBase>
  );
};

export default DocumentoInvalidoCartaCiudadania;
