import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import SolicitudContext from '../../store/solicitud-context';

import Button from './button';
import Highlight from './highlight';

import Checkbox from './checkbox';
import classes from './layout.module.scss';

const Layout = (props) => {
  const { children } = props;

  const router = useRouter();
  const isHome = router.pathname == '/';

  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [logo, setLogo] = useState();
  const [background, setBackground] = useState();
  const [fontFamily, setFontFamily] = useState();
  const [type, setType] = useState();
  const [aceptaTyC, setAceptaTyC] = useState(true);
  const [checked, setChecked] = useState(false);

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
    setBackground(sessionStorage.getItem('background'));
    setFontFamily(sessionStorage.getItem('font-family'));

    const type = sessionStorage.getItem('type');
    setType(type);

    if (type == 'EmpadronamientoBIND') {
      setAceptaTyC(false);
    }

    setVisible(true);
  }, [context.steps]);

  const renderTextButton = () => {
    if (type == 'credenciales') {
      return <div>Continuar</div>;
    } else if (type == 'EmpadronamientoBIND') {
      return <div>Iniciar</div>;

    } else {
      return <div>Iniciar</div>;
    }
  };

  const onClickTerminosReempadronamiento = async (values) => {
    console.log(values)
    setChecked(!checked);
    if (type == 'EmpadronamientoBIND') {
      if (!checked) {
        setAceptaTyC(true);
      }
      else {
        setAceptaTyC(false);
      }
    }
  };

  const renderTerminosReempadronamiento = () => {
    return (
      <div
        className={classes.reempadronamiento}
      >
        He leído y acepto los
        <Highlight primary>
          <a
            href={`/pdf/TyCdelBind-reempadronamiento.pdf`}
            rel="noreferrer"
            target="_blank"
          >
            <span className={classes.tyc}> Terminos y Condiciones</span>
          </a>
        </Highlight>
      </div>
    );
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
              <Highlight>es importante que tengas a mano</Highlight>: DNI,
              Email y Celular
            </div>
            <div className={classes.middle}>
              Y que te ubiques en un lugar con buena luz.
            </div>
            {(aceptaTyC || isHome) && (

              <div className={classes.small}>
                Para comenzar con el proceso de reempadronamiento, aceptá
                nuestros Términos y Condiciones.
                <br />
                <br />
                <div >
                  <Checkbox
                    onChange={onClickTerminosReempadronamiento}
                    label={renderTerminosReempadronamiento()}
                    required
                  />
                </div>
              </div>

            )}

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
    <React.Fragment>
      <Head>
        <link
          href={`https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@200;400;500;600;700;900&display=swap`}
          rel="stylesheet"
          crossOrigin="true"
        />
      </Head>
      <div className={classes.layout} style={{ backgroundImage: `url("${background}")`, fontFamily: fontFamily }}>
        <div className={classes.gradient}>
          <div className={`${classes.jumbotron} ${isHome && classes.home}`}>
            <div className={classes.logo}>
              <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
            </div>
            {renderText()}
            {isHome && (
              <div className={classes.action}>
                <Button
                  disabled={!aceptaTyC}
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
    </React.Fragment>

  );
};

export default Layout;
