import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import Button from '../ui/button';
import Checkbox from '../ui/checkbox';
import Form from '../ui/form';
import Highlight from './../ui/highlight';

import { entidad } from '../../models/entidad';
import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import { openBase64Pdf } from './../../services/files';

import classes from './form-cuenta-comitente.module.scss';

const FormCuentaComitente = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [valid, setValid] = useState(false);

  const [terminos, setTerminos] = useState();

  useEffect(() => {
    async function getForm() {
      let response = {};

      response = await entidad.getTerminosCuentaComitente();
      if (response) {
        setTerminos(response);
      }
    }

    getForm();
  }, []);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  const renderTerminosCuentaComitente = () => {
    return (
      <div onClick={onClickTerminos}>
        Acepto los
        <Highlight primary>
          <a
            onClick={() => {
              openBase64Pdf(terminos.contenido);
            }}
          >
            Terminos & Condiciones&nbsp;
          </a>
        </Highlight>
        para abrir cuenta comitente
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <React.Fragment>
        <Button block type="secondary" text="Ahora no" onClick={onCancel} />
      </React.Fragment>
    );
  };

  const onClickTerminos = async (checked) => {
    if (!terminos || !checked) {
      return;
    }
  };

  const onCancel = () => {
    context.nextStep(router);
  };

  const onSubmit = () => {
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form renderButtons={renderButtons} onSubmit={onSubmit}>
      <div className={classes.image}>
        <Image
          src="/images/bind-inversiones.png"
          alt="instruction"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={classes.text}>
        Con <Highlight>Bind Inversiones</Highlight> podes tener una cuenta
        comitente gratuita para invertir tus ventas. Operá con Dólar MEP,
        acciones, bonos y muchos activos más.
      </div>
      <div className={classes.terms}>
        <Checkbox
          label={renderTerminosCuentaComitente()}
          name="aceptaTyc"
          required
        />
      </div>
    </Form>
  );
};

export default FormCuentaComitente;
