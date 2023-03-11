import { useContext, useState } from 'react';

import Input from '../ui/input';
import Form from './../ui/form';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormEmail = () => {
  const context = useContext(SolicitudContext);

  const [valid, setValid] = useState(false);

  const onSubmit = async (values) => {
    await solicitud.updateEmail(values.email);
    await solicitud.sendEmailOtp();
    context.updateForm(values);
    context.changeScreen(solicitud.screens.otp);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label="Correo electrónico"
        name="email"
        placeholder="usuario@email.com"
        required
        autofocus
      />
    </Form>
  );
};

export default FormEmail;
