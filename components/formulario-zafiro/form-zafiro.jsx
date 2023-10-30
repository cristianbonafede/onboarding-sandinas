import { useContext, useEffect, useState } from 'react';

import Checkbox from '../ui/checkbox';
import Form from '../ui/form';

import { entidad } from '../../models/entidad';
import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';
import Highlight from '../ui/highlight';

import { openBase64Pdf } from '../../services/files';

import classes from './form-zafiro.module.scss';

const FormZafiro = () => {
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
      <Checkbox
        label="¿Sos una persona politicamente expuesta (PEP)?"
        name="esPEP"
        description="Son personas que tienen o tuvieron una función pública."
      />
      <Checkbox
        label="¿Sos ciudadano o residente fiscal estadounidense (FATCA)?"
        name="esFacta"
        description="Ley emitida por Estados Unidos diseñada para detectar contribuyentes estadounidenses que no estén reportando sus ingresos en cuentas fuera del país"
      />
      <Checkbox
        label="¿Sos ciudadano o residente fiscal de otro país (OCDE)?"
        name="esOcde"
      />
      <Checkbox
        label="¿Sos Sujeto Obligado (UIF)? "
        name="esUif"
        description="Son personas que deben brindar datos a la UIF para prevenir el lavado de dinero y financiación del terrorismo"
      />
      <Checkbox label={renderTerminos()} name="aceptaTyc" required />
    </Form>
  );
};

export default FormZafiro;
