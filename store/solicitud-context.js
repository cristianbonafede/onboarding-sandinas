import { createContext, useEffect, useState } from 'react';

import { entidad } from '../models/entidad';
import { solicitud } from '../models/solicitud';

import { hashSha256 } from '../services/security';
import { theme } from '../services/theme';

// import { hashSha256 } from '../services/security';

const SolicitudContext = createContext({
  entidadId: -1,
  cliente: {},
  steps: [],
  step: {},
  screen: '',
  form: {},
  formProperty: '',
  initialize: () => {},
  changeScreen: (value) => {},
  updateStep: (router) => {},
  validateStep: async (router) => {},
  nextStep: async (router, step) => {},
  updateForm: (values) => {},
  updateFormProperty: (value) => {},
});

export function SolicitudContextProvider(props) {
  // State
  const [loaded, setLoaded] = useState();
  const [cliente, setCliente] = useState();
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState();
  const [screen, setScreen] = useState(solicitud.screens.instructions);
  const [form, setForm] = useState({});
  const [formProperty, setFormProperty] = useState();

  useEffect(() => {
    const entidadId = sessionStorage.getItem('entidad');
    if (entidadId) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    const getCliente = async () => {
      if (!loaded || cliente) {
        return;
      }

      const nCliente = await entidad.get();

      setCliente(nCliente);
      theme.set(nCliente);

      const steps = await solicitud.getSteps(nCliente);

      for (let i = 0; i < steps.length; i++) {
        const raw = process.env.NEXT_PUBLIC_HASH_KEY + steps[i].url;
        steps[i].hash = await hashSha256(raw);
      }

      setSteps(steps);
    };

    getCliente();
  }, [loaded]);

  // Methods
  const initialize = () => {
    setLoaded(true);
  };

  const changeScreen = (value) => {
    setScreen(value);
  };

  const validateStep = async (router) => {
    if (steps.length === 0) {
      return false;
    }

    const currentUrl = router.pathname;
    const raw = process.env.NEXT_PUBLIC_HASH_KEY + currentUrl;
    const currentHash = await hashSha256(raw);
    const allowedHash = sessionStorage.getItem('step');

    let allowedIndex = steps.findIndex((x) => x.hash === allowedHash);
    allowedIndex = allowedIndex == -1 ? 0 : allowedIndex;
    const currentIndex = steps.findIndex((x) => x.hash === currentHash);

    const allowed = currentIndex > -1 && currentIndex <= allowedIndex;
    const nScreen = sessionStorage.getItem('screen');

    if (allowed) {
      setScreen(nScreen ?? solicitud.screens.instructions);
    }

    return allowed ? undefined : steps[allowedIndex].url;
  };

  const updateStep = async (router) => {
    if (router.pathname === '/procesando') {
      setStep({ url: router.pathname, title: 'En Proceso' });
      return;
    }

    if (router.pathname === '/finalizar') {
      setStep({ url: router.pathname, title: '¡Bienvenido!' });
      return;
    }

    const url = router.pathname;
    const nStep = steps.find((x) => x.url === url);

    if (nStep?.validations) {
      for (let i = 0; i < nStep.validations.length; i++) {
        const action = nStep.validations[i];
        const valid = await solicitud.runAction(action, {});

        if (!valid) {
          break;
        }
      }
    }

    setStep(nStep);
  };

  const nextStep = async (router, url, screen) => {
    if (url) {
      const raw = process.env.NEXT_PUBLIC_HASH_KEY + url;
      const hash = await hashSha256(raw);
      sessionStorage.setItem('step', hash);
      sessionStorage.setItem('screen', screen);
      router.push(url);
      return;
    }

    sessionStorage.removeItem('screen');

    const index = steps.indexOf(step);
    const nStep = steps[index + 1];
    sessionStorage.setItem('step', nStep.hash);

    setScreen(solicitud.screens.empty);

    router.push(nStep.url);
  };

  const updateForm = (values) => {
    setForm(values);
  };

  const updateFormProperty = (value) => {
    setFormProperty(value);
  };

  const context = {
    cliente: cliente,
    steps: steps,
    step: step,
    screen: screen,
    form: form,
    formProperty: formProperty,
    initialize: initialize,
    changeScreen: changeScreen,
    updateStep: updateStep,
    validateStep: validateStep,
    nextStep: nextStep,
    updateForm: updateForm,
    updateFormProperty: updateFormProperty,
  };

  return (
    <SolicitudContext.Provider value={context}>
      {props.children}
    </SolicitudContext.Provider>
  );
}

export default SolicitudContext;
