import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import Button from '../ui/button';
import Form from '../ui/form';
import Otp from '../ui/otp';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from '../ui/highlight';
import classes from './form-otp.module.scss';

const FormOtp = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);
  const [valid, setValid] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
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

  const renderButtons = () => {
    return (
      <React.Fragment>
        <Button
          block
          type="secondary"
          text="Reenviar email"
          disabled={!resend}
          onClick={onClickSend}
          loading={loading}
        />
        <Button
          block
          type="secondary"
          text="Cambiar el email"
          onClick={onClickBack}
        />
        {context.step?.skipable && (
          <Button block type="secondary" text="Continuar sin validar email" onClick={onClickSkip} />
        )}
      </React.Fragment>
    );
  };

  const onClickSkip = async () => {
    await context.nextStep(router);
  };

  const onClickSend = async () => {
    setLoading(true);
    await solicitud.sendEmailOtp();
    setLoading(false);
    setResend(false);
  };

  const onClickBack = async () => {
    return context.changeScreen(solicitud.screens.form);
  };

  const onSubmit = async (values) => {
    setError(false);

    const response = await solicitud.validateEmailOtp(values.otp);
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
        <Highlight primary>código de verificación</Highlight> a tu email.
        Ingresa el código recibido en
        <Highlight primary>{context.form.email}</Highlight>
      </div>
      <Otp size={4} error={error} />
    </Form>
  );
};

export default FormOtp;
