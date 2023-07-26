import { useContext, useEffect, useState } from 'react';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import Image from 'next/image';
import Input from '../ui/input';
import Form from './../ui/form';
import Select from './../ui/select';
import ModalTramite from './modal-tramite';

import classes from './form-documento.module.scss';

const FormDocumento = () => {
  const context = useContext(SolicitudContext);

  const [form, setForm] = useState();
  const [colorPrimary, setColorPrimary] = useState();
  const [generos, setGeneros] = useState([
    { value: 'F', text: 'Femenino' },
    { value: 'M', text: 'Masculino' },
    { value: 'X', text: 'No binario' },
  ]);
  const [modalTramite, setModalTramite] = useState(false);

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  const onSubmit = async (values) => {
    const response = await solicitud.create(
      context.form.frente,
      context.form.dorso,
      values.genero,
      values.documento,
      values.tramite
    );

    if (response.error) {
      window.location.replace(`error?code=${response.codigo}`);
      return;
    }

    const solicitudId = response.data.id;
    sessionStorage.setItem('solicitud', solicitudId);

    if (sessionStorage.getItem('gestor')) {
      await solicitud.updateGestor();
    }
    if (sessionStorage.getItem('email')) {
      await solicitud.updateEmail(sessionStorage.getItem('email'));
    }


    if (sessionStorage.getItem('ref_id')) {
      await solicitud.updateRef_Id();
    }

    context.changeScreen(solicitud.screens.checklist);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form values={form} onSubmit={onSubmit}>
      <div className={classes.section}>
        <div className={classes.title}>Ingresá los datos de tu DNI</div>
      </div>
      <Select
        placeholder="Seleccione"
        label="Género"
        name="genero"
        options={generos}
        required
      />
      <Input
        label="DNI"
        name="documento"
        required
        validators={[
          {
            pattern: new RegExp(/^[0-9]{7,9}$/),
            message: 'Debe contener de 7 a 9 caracteres numéricos',
          },
        ]}
      />
      <Input
        label="Número de trámite"
        name="tramite"
        required
        validators={[
          {
            pattern: new RegExp(/^[0-9]{11}$/),
            message: 'Debe contener 11 caracteres numéricos',
          },
        ]}
      />

      <div
        className={classes.link}
        style={{ color: colorPrimary }}
        onClick={() => setModalTramite(true)}
      >
        ¿Dónde encuentro mi número de trámite?
      </div>

      <div className={classes.footer}>
        <div className={classes.image}>
          <Image
            src="/images/renaper.png"
            alt="logo del Renaper"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.text}>
          Al continuar, aceptás que comparemos tus datos con el Registro
          Nacional de las Personas (RENAPER).
        </div>
      </div>

      <ModalTramite
        visible={modalTramite}
        onClose={() => setModalTramite(false)}
      />
    </Form>
  );
};

export default FormDocumento;
