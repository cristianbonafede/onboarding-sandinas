import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import CredencialesIncompletas from './errores/credenciales-incompleta';
import CredencialesNoValidas from './errores/credenciales-no-validas';
import DniInvalidoCartaCiudadania from './errores/dni-invalido-carta-ciudadania';
import DocumentoNoEncontrado from './errores/documento-no-encontrado';
import EjemplarNoValido from './errores/ejemplar-no-valido';
import FalloFinalReconocimientoFacial from './errores/fallo-final-reconocimiento-facial';
import FalloParcialReconocimientoFacial from './errores/fallo-parcial-reconocimiento-facial';
import Generico from './errores/generico';
import IntentosExcedidos from './errores/intentos-excedidos';
import IntentosExcedidosOtpEmail from './errores/intentos-excedidos-otp-email';
import IntentosExcedidosOtpSms from './errores/intentos-excedidos-otp-sms';
import NoExistePersona from './errores/no-existe-persona';
import Pdf417NoEncontrado from './errores/pdf417-no-encontrado';
import PendienteBindid from './errores/pendiente-bindid';
import PendienteContactar from './errores/pendiente-contactar';
import PersonaFallecida from './errores/persona-fallecida';
import PersonaNoEncontrada from './errores/persona-no-encontrada';
import PruebaVidaIncompleta from './errores/prueba-vida-incompleta';
import PruebaVidaIntentosExcedidos from './errores/prueba-vida-intentos-excedidos';
import RechazoMatrizRiesgo from './errores/rechazo-matriz-riesgo';
import SolicitudPreviaAprobada from './errores/solicitud-previa-aprobada';
import ValidacionFacialIncompleta from './errores/valdiacion-facial-incompleta';

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
        return <DocumentoNoEncontrado />;

      case 'PDF417_NO_ENCONTRADO':
        return <Pdf417NoEncontrado />;

      case 'INTENTOS_EXCEDIDOS':
        return <IntentosExcedidos />;

      case 'PERSONA_NO_ENCONTRADA':
        return <PersonaNoEncontrada />;

      case 'PERSONA_FALLECIDA':
        return <PersonaFallecida />;

      case 'DOCUMENTO_NO_VIGENTE':
        return <EjemplarNoValido />;

      case 'PRUEBA_VIDA_INTENTOS_EXCEDIDOS':
        return <PruebaVidaIntentosExcedidos />;

      case 'RECHAZO_MATRIZ_DE_RIESGO':
        return <RechazoMatrizRiesgo />;

      case 'SOLICITUD_PREVIA_APROBADA':
        return <SolicitudPreviaAprobada />;

      case 'INTENTOS_EXCEDIDOS_OTP_EMAIL':
        return <IntentosExcedidosOtpEmail />;

      case 'INTENTOS_EXCEDIDOS_OTP_SMS':
        return <IntentosExcedidosOtpSms />;

      case 'VALIDACION_FACIAL_INCOMPLETA':
        return <ValidacionFacialIncompleta />;

      case 'PRUEBA_VIDA_INCOMPLETA':
        return <PruebaVidaIncompleta />;

      case 'CREDENCIALES_NO_VALIDAS':
        return <CredencialesNoValidas />;

      case 'CREDENCIALES_INCOMPLETAS':
        return <CredencialesIncompletas />;

      case 'PENDIENTE_BINDID':
        return <PendienteBindid />;

      case 'DNI_INVALIDO_CARTA_CIUDADANIA':
        return <DniInvalidoCartaCiudadania />;

      case 'FALLO_PARCIAL_RECONOCIMIENTO_FACIAL':
        return <FalloParcialReconocimientoFacial />;

      case 'FALLO_FINAL_RECONOCIMIENTO_FACIAL':
        return <FalloFinalReconocimientoFacial />;

      case 'ERROR_NO_EXISTE_PERSONA':
        return <NoExistePersona />;
        
      case 'PENDIENTE_CONTACTAR_PERSONA':
        return <PendienteContactar />;

      default:
        return <Generico />;
    }
  };

  return <React.Fragment>{ready && renderError()}</React.Fragment>;
};

export default Error;
