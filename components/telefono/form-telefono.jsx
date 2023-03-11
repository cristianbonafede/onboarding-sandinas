import { useContext, useEffect, useState } from 'react';

import Form from '../ui/form';
import Input from '../ui/input';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

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
      />
    </Form>
  );
};

export default FormTelefono;
