import { useContext, useEffect, useState } from 'react';

import Checkbox from '../ui/checkbox';
import Form from '../ui/form';

import { entidad } from '../../models/entidad';
import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';
import Highlight from '../ui/highlight';

import { openBase64Pdf } from '../../services/files';

import classes from './form-ripsa.module.scss';

const FormRipsa = () => {
  const context = useContext(SolicitudContext);

  const [form, setForm] = useState();
  const [valid, setValid] = useState(false);

  const [terminos, setTerminos] = useState();

  useEffect(() => {
    async function getForm() {
      const response = await entidad.getTerminos();
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

  const renderTerminos = () => {
    return (
      <div onClick={onClickTerminos}>
        Acepto los
        <Highlight primary>
          <a
            onClick={() => {
              openBase64Pdf(terminos.contenido);
            }}
          >
            Terminos & Condiciones &nbsp;
          </a>
        </Highlight>
      </div>
    );
  };

  const onClickTerminos = async (checked) => {
    if (!terminos || !checked) {
      return;
    }
  };

  const onSubmit = (values) => {
    context.updateForm(values);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form values={form} onSubmit={onSubmit}>
      <div className={classes.section}>
        <div className={classes.title}>
          ¡Hola {form?.nombres} {form?.apellidos}!
        </div>
      </div>
      <div className={classes.content}>
        <Highlight>¡Ya casi terminamos!</Highlight>
      </div>
      <div className={classes.content}>
        Solo resta que aceptes los términos y condiciones para que puedas pagar la factura de
        <Highlight>
          más de 5000 empresas y servicios
        </Highlight>
        a través de nuestro portal de pagos de la forma más
        <Highlight>
          fácil y segura.
        </Highlight>
      </div>
      <Checkbox label={renderTerminos()} name="aceptaTyc" required />
    </Form>
  );
};

export default FormRipsa;
