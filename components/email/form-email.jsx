import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { solicitud } from '../../models/solicitud';
import Input from '../ui/input';
import Button from './../ui/button';
import Form from './../ui/form';

import SolicitudContext from '../../store/solicitud-context';
import classes from './form-email.module.scss';

import Highlight from './../ui/highlight';


const FormEmail = () => {
  const router = useRouter();
  const [form, setForm] = useState();
  const [haveEmail, setHaveEmail] = useState(false);

  const context = useContext(SolicitudContext);

  const [emailRequired, setEmailRequired] = useState(true);
  const type = sessionStorage.getItem('type');

  useEffect(() => {
    if (!context.step) {
      return;
    }

    async function getForm() {
      if (type == "WebPagos") {
        let response = {};
        response = await solicitud.get();
        if (response && response.email) {
          setHaveEmail(true);
          setForm(response);
        }
      }
    }

    getForm()

    setEmailRequired(!context.step.skipable);
  }, [context.step]);

  const renderButtons = () => {
    return (
      <React.Fragment>
        {context.step?.skipable && (
          <Button
            block
            type="secondary"
            text="Continuar sin email"
            onClick={onClickSkip}
          />
        )}
      </React.Fragment>
    );
  };

  const onClickSkip = async () => {
    await context.nextStep(router);
  };

  const onSubmit = async (values) => {
    if (!emailRequired && !values.email) {
      await context.nextStep(router);
      return;
    }

    await solicitud.updateEmail(values.email);
    await solicitud.sendEmailOtp();
    context.updateForm(values);
    context.changeScreen(solicitud.screens.otp);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form values={form} renderButtons={renderButtons} onSubmit={onSubmit}>
      <Input
        label="Correo electrónico"
        name="email"
        placeholder="usuario@email.com"
        required={emailRequired}
        autofocus
        validators={[
          {
            type: "email",
            message: 'Ingrese un email válido',
          },
        ]}
      />
      {type == "WebPagos" && haveEmail && (
        <div className={classes.text}>
          A continuación, te enviaremos un código de verificación a este email.
          <Highlight primary>Si no es tu email vigente, podes editarlo </Highlight>
          seleccionando la misma caja de texto.
        </div>
      )}

    </Form>
  );
};

export default FormEmail;
