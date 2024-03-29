import React, { useContext, useEffect, useRef, useState } from 'react';
import Input from './input';

import FormContext from '../../store/form-context';

import classes from './otp.module.scss';

let currentIndex = 0;

const Otp = (props) => {
  const { size, error } = props;

  const context = useContext(FormContext);

  const [values, setValues] = useState(new Array(size).fill(''));
  const [active, setActive] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  const [colorPrimary, setColorPrimary] = useState();

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);


  useEffect(() => {

    inputRef.current?.focus();
  }, [active]);

  const renderStyle = (focused) => {
    const style = {
      borderColor: focused ? colorPrimary : '#d8d6de',
    };

    return style;
  };

  const onKeyDown = (event, index) => {
    currentIndex = index;

    if (event.key === 'Backspace') {
      setValues(new Array(size).fill(''));
      setActive(0);
    }
  };

  const onChange = (event) => {
    setIsActive(true);
    const { value } = event.target;
    const nValues = [...values];
    nValues[currentIndex] = value.substring(value.length - 1);
    if (!value) {
      setActive(currentIndex - 1);
    } else {
      setActive(currentIndex + 1);
    }

    setValues(nValues);
    context.form.setFieldsValue({ otp: nValues.join('') });

    //verificacmos si hay alguno previo vacio
    const primerIndiceConDatos = nValues.findIndex(elemento => elemento !== '');
    const hayElementoVacioAntesDelPrimerDato = nValues.slice(0, primerIndiceConDatos).some(elemento => elemento === '');
    if (hayElementoVacioAntesDelPrimerDato) {
      setValues(new Array(size).fill(''));
      setActive(0);
      return;
    }


    // Quitar el enfoque cuando completa el OTP
    if (currentIndex === 3) {
      inputRef.current.blur();
      setIsActive(false);
    }
  };
  const onFocus = (event) => {
    const nValues = [...values];
    if (nValues.findIndex(x => x === '') === -1 || !isActive) {
      setValues(new Array(size).fill(''));
      setActive(0);
    }
  };

  const onBlur = (event) => {
    setIsActive(false);
  };

  const validator = (size) => {
    return () => ({
      validator(_, value) {
        if (value && value.length == size) {
          return Promise.resolve();
        }

        if (!value) {
          return Promise.reject('Este campo es obligatorio');
        }

        return Promise.reject(`Debe ingresar los ${size} dígitos`);
      },
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.otp}>
        {values.map((_, index) => (
          <input
            key={index}
            type="number"
            className={classes.input}
            ref={index === active ? inputRef : null}
            value={values[index]}
            onKeyDown={(e) => onKeyDown(e, index)}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            style={renderStyle(index === active)}
          />
        ))}
      </div>
      <div className={classes.error}>
        <Input name="otp" hidden validators={[validator(size)]} />
        {error && 'El código ingresado no es correcto'}
      </div>
    </div>
  );
};;

export default Otp;
