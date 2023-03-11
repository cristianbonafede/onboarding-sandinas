import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import Button from '../ui/button';
import Form from '../ui/form';
import Otp from '../ui/otp';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './form-otp.module.scss';

const FormOtp = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);
  const readonly = sessionStorage.getItem('otpReadonly') === 'true';

  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);
  const [valid, setValid] = useState(false);

  const [loading, setLoading] = useState(false);

  const renderButtons = () => {
    return (
      <React.Fragment>
        {!readonly && (
          <Button
            block
            type="secondary"
            text="Cambiar el teléfono"
            onClick={onClickBack}
          />
        )}

        <Button
          block
          type="secondary"
          text="Reenviar"
          disabled={!resend}
          onClick={onClickSend}
          loading={loading}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    async function checkValid() {
      if (valid) {
        if (context.step.actions.length === 0) {
          await context.nextStep(router);
          return;
        }

        context.changeScreen(solicitud.screens.checklist);
      }
    }

    checkValid();
  }, [valid]);

  useEffect(() => {
    if (context.screen !== solicitud.screens.otp || resend) {
      return;
    }

    const timer = setTimeout(() => {
      setResend(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, [context.screen, resend]);

  const onClickSend = async () => {
    setLoading(true);
    await solicitud.sendTelefonoOtp();
    setLoading(false);
    setResend(false);
  };

  const onClickBack = async () => {
    if (readonly) {
      return;
    }
    return context.changeScreen(solicitud.screens.form);
  };

  const onSubmit = async (values) => {
    setError(false);

    const response = await solicitud.validateTelefonoOtp(values.otp);
    if (response) {
      context.updateForm(values);
      setValid(true);
      return;
    }

    setError(true);
  };

  if (context.screen !== solicitud.screens.otp) {
    return;
  }

  return (
    <Form centered renderButtons={renderButtons} onSubmit={onSubmit}>
      <div className={classes.description}>
        Te enviamos un
        <Highlight primary>código de verificación</Highlight>en un mensaje de
        texto. Ingresá el codigo recibido en el teléfono
        <Highlight primary>{context.form.telefono}</Highlight>.
      </div>
      <Otp size={4} error={error} />
    </Form>
  );
};

export default FormOtp;
