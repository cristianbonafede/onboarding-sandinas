import { useContext, useEffect, useState } from 'react';

import Form from '../ui/form';
import Input from '../ui/input';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';
import Highlight from './../ui/highlight';

import classes from './form-telefono.module.scss';

const FormTelefono = () => {
  const context = useContext(SolicitudContext);
  const readonly = sessionStorage.getItem('otpReadonly') === 'true';

  const [form, setForm] = useState();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function getForm() {
      if (!readonly) {
        return;
      }

      if (!form) {
        const response = await solicitud.get();
        const values = { telefono: response.telefono };
        setForm(values);
      }

      if (context.screen === solicitud.screens.form) {
        onSubmit(form);
      }
    }

    getForm();
  }, [context.screen]);

  const onSubmit = async (values) => {
    if (!readonly) {
      await solicitud.updateTelefono(values.telefono);
    }

    await solicitud.sendTelefonoOtp();
    context.updateForm(values);
    context.changeScreen(solicitud.screens.otp);
  };

  if (context.screen !== solicitud.screens.form || readonly) {
    return;
  }

  return (
    <Form values={form} onSubmit={onSubmit}>
      <Input
        label="Teléfono"
        name="telefono"
        placeholder="1123456789"
        required
        autofocus
        readonly={readonly}
        type="number"
        inputMode="tel"
        addonBefore="(+54 9)"
        validators={[
          {
            pattern: new RegExp(/^[0-9]{10}$/),
            message: 'Ingrese los 10 dígitos del celular',
          },
          {
            pattern: new RegExp(/^[^0]/),
            message: 'Ingrese un celular válido',
          },
        ]}
      />

      <div className={classes.description}>
        Ingresá tu número de celular sin espacio ni guiones,
        <Highlight primary> incluyendo el código de área.</Highlight>
      </div>
    </Form>
  );
};

export default FormTelefono;
