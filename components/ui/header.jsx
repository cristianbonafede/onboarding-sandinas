import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { solicitud } from '../../models/solicitud';

import SolicitudContext from '../../store/solicitud-context';

import classes from './header.module.scss';

const Header = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [title, setTitle] = useState();
  const [visible, setVisible] = useState(false);
  const [colorAccent, setColorAccent] = useState();
  const [colorPrimary, setColorPrimary] = useState();
  const [colorText, setColorText] = useState();

  const [previousStep, setPreviousStep] = useState();

  useEffect(() => {
    if (!context.step) {
      setTitle('');
      return;
    }

    if (context.step.url === '/finalizar') {
      setTitle('Finalizado');
      return;
    }

    if (context.step.url === '/procesando') {
      setTitle('Pendiente');
      return;
    }

    const index = context.steps.indexOf(context.step) + 1;
    const length = context.steps.length - 1;
    setTitle(`Paso ${index} de ${length}`);
  }, [context.steps, context.step]);

  useEffect(() => {
    context.updateStep(router);
  }, []);

  useEffect(() => {
    const step = context.steps.find((x) => x.url === router.pathname);
    const index = context.steps.indexOf(step) - 1;

    if (index > -1 && step.url !== '/finalizar' && step.url !== '/procesando') {
      setPreviousStep(context.steps[index]);
    }
  }, [context.step]);

  useEffect(() => {
    setColorAccent(sessionStorage.getItem('color-accent'));
    setColorPrimary(sessionStorage.getItem('color-primary'));
    setColorText(sessionStorage.getItem('color-text'));
    setVisible(true);
  }, []);

  const onClickBack = () => {
    router.push(previousStep.url);
  };

  if (
    !visible ||
    (window.innerWidth <= 768 && context.screen === solicitud.screens.camera)
  ) {
    return <></>;
  }

  return (
    <div
      className={classes.header}
      style={{
        color: colorText,
        background: `linear-gradient(180deg, ${colorPrimary} 65%, transparent 35%)`,
      }}
    >
      <div className={classes.container}>
        {previousStep && (
          <div
            className={classes.back}
            style={{ color: colorAccent }}
            onClick={onClickBack}
          >
            <FiChevronLeft />
          </div>
        )}
        <div className={classes.step} style={{ color: colorAccent }}>
          {title}
        </div>
        <div className={classes.title} style={{ color: colorText }}>
          {context.step?.title}
        </div>
      </div>

      <svg
        width="100%"
        height="80"
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
        className={classes.bottom}
      >
        <path d="M0,0 L0,40 Q250,80 500,40 L500,0 Z" fill={colorPrimary} />
      </svg>
    </div>
  );
};

export default Header;
