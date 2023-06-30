import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import Input from '../ui/input';
import Button from './../ui/button';
import Form from './../ui/form';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormEmail = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [emailRequired, setEmailRequired] = useState(true);

  useEffect(() => {
    if (!context.step) {
      return;
    }

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
    <Form renderButtons={renderButtons} onSubmit={onSubmit}>
      <Input
        label="Correo electrónico"
        name="email"
        placeholder="usuario@email.com"
        required={emailRequired}
        autofocus
      />
    </Form>
  );
};

export default FormEmail;
