import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import Form from '../ui/form';
import Input from '../ui/input';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './form-credenciales.module.scss';

const FormCredenciales = () => {
  const context = useContext(SolicitudContext);

  const [form, setForm] = useState({});
  const [valid, setValid] = useState(false);

  const [validationLength, setValidationLength] = useState();
  const [validationLowercase, setValidationLowercase] = useState();
  const [validationUppercase, setValidationUppercase] = useState();
  const [validationNumbers, setValidationNumbers] = useState();
  const [validationInformation, setValidationInformation] = useState();

  useEffect(() => {
    async function getForm() {
      const response = await solicitud.get();
      setForm(response);
    }

    getForm();
  }, []);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  const compare = () => {
    return ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject('Las contraseñas no son iguales');
      },
    });
  };

  const renderValidationIcon = (value) => {
    if (value === undefined) {
      return <div className={classes.icon}></div>;
    }

    const src = value ? '/images/check.png' : '/images/close.png';

    return (
      <div className={classes.icon}>
        <Image src={src} alt="Status" layout="fill" objectFit="contain" />
      </div>
    );
  };

  const renderValidationClasses = (value) => {
    if (value === undefined) {
      return `${classes.validation}`;
    }

    return `${classes.validation} ${classes.completed}`;
  };

  const onChangePassword = (e) => {
    const value = e.target.value;

    if (!value) {
      setValidationLength(false);
      setValidationLowercase(undefined);
      setValidationUppercase(undefined);
      setValidationNumbers(undefined);
      setValidationInformation(undefined);
      return;
    }

    // Longitud
    const nValidationLength = value.length >= 8;
    console.log(nValidationLength);
    setValidationLength(nValidationLength);

    // Minusculas
    const nValidationLowercase = value.toUpperCase() != value;
    setValidationLowercase(nValidationLowercase);

    // Mayusculas
    const nValidationUppercase = value.toLowerCase() != value;
    setValidationUppercase(nValidationUppercase);

    // Numeros
    const nValidationNumbers = /\d/.test(value);
    setValidationNumbers(nValidationNumbers);

    // Datos personales
    let nValidationInformation = true;

    // Documento
    const documento = form.documento;
    if (value.includes(documento)) {
      nValidationInformation = false;
    }

    // Nombres
    const nombres = form.nombres?.toLowerCase().split(' ');
    for (let i = 0; i < nombres.length; i++) {
      if (value.includes(nombres[i])) {
        nValidationInformation = false;
      }
    }

    // Apellidos
    const apellidos = form.apellidos?.toLowerCase().split(' ');
    for (let i = 0; i < apellidos.length; i++) {
      if (value.includes(apellidos[i])) {
        nValidationInformation = false;
      }
    }

    // Fecha de Nacimiento
    const birthdate = form.fechaNacimiento?.split('/');
    const day = birthdate[0];
    const month = birthdate[1];
    const year = birthdate[2];

    if (value.includes(year) || value.includes(month) || value.includes(day)) {
      nValidationInformation = false;
    }

    setValidationInformation(nValidationInformation);
  };

  const onSubmit = (values) => {
    if (
      !validationLength ||
      !validationLowercase ||
      !validationUppercase ||
      !validationNumbers ||
      !validationInformation
    ) {
      return;
    }

    context.updateForm(values);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input label="Usuario" name="usuario" required autofocus />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        required
        onChange={onChangePassword}
      />
      <Input
        label="Confirmar contraseña"
        name="passwordConfirm"
        type="password"
        required
        validators={[compare()]}
      />

      <div className={classes.validations}>
        Una contraseña segura debe tener:
        <ul>
          <li className={renderValidationClasses(validationLength)}>
            {renderValidationIcon(validationLength)}
            Al menos 8 caracteres
          </li>
          <li className={renderValidationClasses(validationLowercase)}>
            {renderValidationIcon(validationLowercase)}
            Contener minúsculas
          </li>
          <li className={renderValidationClasses(validationUppercase)}>
            {renderValidationIcon(validationUppercase)}
            Contener mayúsculas
          </li>
          <li className={renderValidationClasses(validationNumbers)}>
            {renderValidationIcon(validationNumbers)}
            Contener números
          </li>
          <li className={renderValidationClasses(validationInformation)}>
            {renderValidationIcon(validationInformation)}
            No contener datos personales ni bancarios públicos. (Ej: DNI,
            Nombre, Apellido, Fecha de nacimiento)
          </li>
        </ul>
      </div>

      <div className={classes.footer}>
        Recordá tu <Highlight primary> contraseña</Highlight>y no la compartas
        con nadie. Las necesitarás para ingresar en el{' '}
        <Highlight primary>Homebanking</Highlight> y administrar tu
        cuenta.
      </div>
    </Form>
  );
};

export default FormCredenciales;
