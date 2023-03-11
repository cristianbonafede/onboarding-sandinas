import { createContext } from 'react';

const FormContext = createContext({
  form: {},
  valid: false,
});

export function FormContextProvider(props) {
  return (
    <FormContext.Provider value={{ form: props.form }}>
      {props.children}
    </FormContext.Provider>
  );
}

export default FormContext;
