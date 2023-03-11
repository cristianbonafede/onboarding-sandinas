import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import SolicitudContext from '../../store/solicitud-context';

import Button from './button';
import Highlight from './highlight';

import classes from './layout.module.scss';

const Layout = (props) => {
  const { children } = props;

  const router = useRouter();
  const isHome = router.pathname == '/';

  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [logo, setLogo] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    function handleResize() {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const { innerWidth: width, innerHeight: height } = window;

      setLandscape(isMobile && width > 768 && width > height);

      let vh = innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (context.steps.length === 0) {
      return;
    }

    setLogo(sessionStorage.getItem('logo'));
    setType(sessionStorage.getItem('type'));
    setVisible(true);
  }, [context.steps]);

  const renderText = () => {
    // Texto Credenciales
    if (type == 'credenciales') {
      return (
        <div>
          <div className={classes.title}>¡Hola de nuevo!</div>
          <div className={classes.description}>
            <Highlight primary>
              {' '}
              Para terminar el proceso sólo falta completar un paso más.&nbsp;
            </Highlight>
            Haz click en continuar.
          </div>
        </div>
      );
    }
    // Texto Persona Juridica
    if (type == 'juridica') {
      return (
        <div>
          <div className={classes.title}>
            ¡Bienvenido! Para comenzar a cobrar con QR necesitas tener una
            <Highlight primary>cuenta en el banco.</Highlight>
          </div>
          <div className={classes.description}>
            Te contactaremos con un representante del banco para completar el
            proceso rápidamente.
          </div>
        </div>
      );
    } else {
      // Texto Persona fisica
      return (
        <div>
          <div className={classes.title}>
            ¡Bienvenido! Para comenzar a cobrar con QR necesitamos
            <Highlight primary>validar tu identidad.</Highlight>
          </div>
          <div className={classes.description}>
            Tomará unos pocos minutos. Te recomendamos
            <Highlight primary>tener a mano tu DNI</Highlight> y ubicarte en un
            lugar con buena luz.
            <br />
            Recordá que es necesario tener una actividad en AFIP.
          </div>
        </div>
      );
    }
  };

  const onClickRegister = () => {
    const url = context.steps[0].url;
    router.push(url);
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div className={classes.layout}>
      <div className={classes.gradient}>
        <div className={`${classes.jumbotron} ${isHome && classes.home}`}>
          <div className={classes.logo}>
            <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
          </div>
          {renderText()}
          {isHome && (
            <Button type="primary" text="Iniciar" onClick={onClickRegister} />
          )}
        </div>
        <div className={`${classes.main} ${isHome && classes.home}`}>
          {children}
        </div>
      </div>
      {landscape && (
        <div className={classes.landscape}>
          <div className={classes.image}>
            <Image
              src="/images/rotate.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={classes.title}>
            Utilizá tu dispositivo en{' '}
            <Highlight primary>posicion vertical</Highlight>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
