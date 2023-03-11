import { useContext, useEffect, useState } from 'react';

import Form from '../ui/form';
import Input from '../ui/input';
import Select from './../ui/select';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';
import { rubro } from './../../models/rubro';

const FormJuridica = () => {
  const context = useContext(SolicitudContext);

  const [valid, setValid] = useState(false);
  const [rubros, setRubros] = useState([]);

  useEffect(() => {
    async function getRubros() {
      const rubros = await rubro.get();
      setRubros(rubros);
    }

    getRubros();
  }, []);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  const onSubmit = (values) => {
    context.updateForm(values);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input label="Nombre de Fantasía" name="nombre" required autofocus />
      <Input label="CUIT" name="cuit" required />
      <Select
        label="Rubro"
        name="rubro"
        options={rubros}
        value="codigo"
        text="nombre"
        required
      />
      <Input label="Correo Electrónico" name="email" required />
      <Input
        label="Teléfono"
        name="telefono"
        required
        type="number"
        inputMode="tel"
      />
    </Form>
  );
};

export default FormJuridica;
