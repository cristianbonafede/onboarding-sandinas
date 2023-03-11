import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


import CredencialesNoValidas from './errores/credenciales-no-validas';
import DocumentoNoEncontrado from './errores/documento-no-encontrado';
import EjemplarNoValido from './errores/ejemplar-no-valido';
import Generico from './errores/generico';
import IntentosExcedidos from './errores/intentos-excedidos';
import IntentosExcedidosOtpEmail from './errores/intentos-excedidos-otp-email';
import IntentosExcedidosOtpSms from './errores/intentos-excedidos-otp-sms';
import Pdf417NoEncontrado from './errores/pdf417-no-encontrado';
import PersonaFallecida from './errores/persona-fallecida';
import PersonaNoEncontrada from './errores/persona-no-encontrada';
import PruebaVidaIncompleta from './errores/prueba-vida-incompleta';
import PruebaVidaIntentosExcedidos from './errores/prueba-vida-intentos-excedidos';
import RechazoMatrizRiesgo from './errores/rechazo-matriz-riesgo';
import SolicitudPreviaAprobada from './errores/solicitud-previa-aprobada';
import ValidacionFacialIncompleta from './errores/valdiacion-facial-incompleta';

import CredencialesIncompletas from './errores/credenciales-incompleta';
import Pendientesandinasid from './errores/pendiente-sandinasid';

const Error = () => {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [logo, setLogo] = useState();

  useEffect(() => {
    setLogo(sessionStorage.getItem('logo'));
    setReady(true);
  }, []);

  const renderError = () => {
    let code = router.asPath.split('code=')[1] ?? '';

    switch (code) {
      case 'DOCUMENTO_NO_ENCONTRADO':
          return <DocumentoNoEncontrado/>

      case 'PDF417_NO_ENCONTRADO':
          return <Pdf417NoEncontrado/>

      case 'INTENTOS_EXCEDIDOS':
          return <IntentosExcedidos/>

      case 'PERSONA_NO_ENCONTRADA':
          return <PersonaNoEncontrada/>

      case 'PERSONA_FALLECIDA':
          return <PersonaFallecida/>

      case 'EJEMPLAR_NO_VALIDO':
          return <EjemplarNoValido/>

      case 'PRUEBA_VIDA_INTENTOS_EXCEDIDOS':
          return <PruebaVidaIntentosExcedidos/>

      case 'RECHAZO_MATRIZ_DE_RIESGO':
          return <RechazoMatrizRiesgo/>

      case 'SOLICITUD_PREVIA_APROBADA':
          return <SolicitudPreviaAprobada/>

      case 'INTENTOS_EXCEDIDOS_OTP_EMAIL':
        return <IntentosExcedidosOtpEmail/>

      case 'INTENTOS_EXCEDIDOS_OTP_SMS':
        return <IntentosExcedidosOtpSms/>

      case 'VALIDACION_FACIAL_INCOMPLETA':
        return <ValidacionFacialIncompleta/>

      case 'PRUEBA_VIDA_INCOMPLETA':
        return <PruebaVidaIncompleta/>

      case 'CREDENCIALES_NO_VALIDAS':
        return <CredencialesNoValidas/>

      case 'CREDENCIALES_INCOMPLETAS':
          return <CredencialesIncompletas/>

      case 'PENDIENTE_sandinasID':
          return <Pendientesandinasid/> 

      default:
        return <Generico />;
    }
  };

  return (
    <React.Fragment>
    {ready && renderError()}

    </React.Fragment>
    
  );
};

export default Error;
