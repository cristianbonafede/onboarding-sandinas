import { useContext } from 'react';

import Form from '../ui/form';
import Input from '../ui/input';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormCuil = () => {
  const context = useContext(SolicitudContext);

  const onSubmit = async (values) => {
    context.updateForm(values);
    context.changeScreen(solicitud.screens.checklist);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label="Ingresá tu CUIL sin guiones"
        name="cuil"
        placeholder="12345678901"
        required
        autofocus
      />
    </Form>
  );
};

export default FormCuil;
