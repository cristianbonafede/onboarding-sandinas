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

  const renderTextButton = () => {
    if (type == 'credenciales') {
      return <div>Continuar</div>;
    }
    return <div>Iniciar</div>;
  };

  const renderText = () => {
    // Jubilo
    if (type == 'EmpadronamientoBIND') {
      return (
        <div>
          <div className={classes.title}>¡Bienvenidos!</div>
          <div className={classes.description}>
            <div className={classes.middle}>
              Para agilizar tus operaciones en <Highlight>BIND</Highlight>
              es necesario que registres tus datos para que podamos
              identificarte y operar con MAYOR SEGURIDAD y AGILIDAD.
            </div>
            <div className={classes.middle}>
              Para comenzar,{' '}
              <Highlight>es importante que tengas a mano</Highlight>: DNI, Email
              y Celular
            </div>
            <div className={classes.middle}>
              Y que te ubiques en un lugar con buena luz.
            </div>
            <div className={classes.small}>
              El proceso durará unos pocos minutos y, al continuar, estás
              aceptando nuestra Política de Privacidad y Protección de Datos
              Personales. (Para conocerlos hacé
              <Highlight>
                <a
                  href={`/pdf/TyCdelBind-reempadronamiento.pdf`}
                  without
                  rel="noreferrer"
                  target="_blank"
                >
                  &nbsp;click acá
                </a>
              </Highlight>
              )
            </div>
          </div>
        </div>
      );
    }
    if (type == 'WebPagos') {
      return (
        <div>
          <div className={classes.title}>
            ¡Bienvenido! Para que puedas operar con seguridad necesitamos
            <Highlight>validar tu identidad</Highlight>
            <div className={classes.description}>
              <div className={classes.paragraph}>
                Tomará unos pocos minutos. Te recomendamos tener a mano tu DNI y
                ubicarte en un lugar con buena luz.
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Credenciales
    if (type == 'credenciales') {
      return (
        <div>
          <div className={classes.title}>¡Hola de nuevo!</div>
          <div className={classes.description}>
            <Highlight primary>
              Para terminar el proceso sólo falta completar un paso más.&nbsp;
            </Highlight>
            Haz click en continuar.
          </div>
        </div>
      );
    }

    // Persona Juridica
    if (type == 'juridica') {
      return (
        <div>
          <div className={classes.title}>
            ¡Bienvenido! Para comenzar a cobrar con QR necesitas tener una
            <Highlight primary>cuenta en el banco BIND.</Highlight>
          </div>
          <div className={classes.description}>
            Te contactaremos con un representante del banco para completar el
            proceso rápidamente.
          </div>
        </div>
      );
    }

    // Persona Fisica
    return (
      <div>
        <div className={classes.title}>
          ¡Bienvenido! Para comenzar a cobrar con QR necesitamos
          <Highlight primary>validar tu identidad.</Highlight>
        </div>
        <div className={classes.description}>
          <div className={classes.paragraph}>
            Tomará unos pocos minutos. Te recomendamos
            <Highlight primary>tener a mano tu DNI</Highlight> y ubicarte en un
            lugar con buena luz.
          </div>
          <div className={classes.paragraph}>
            Recordá que es necesario tener una actividad en AFIP.
          </div>
        </div>
      </div>
    );
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
            <div className={classes.action}>
              <Button
                type="primary"
                text={renderTextButton()}
                onClick={onClickRegister}
              />
            </div>
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
