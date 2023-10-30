import http from '../services/http';
import { compressBase64Image } from '../services/images';
import { hashSha1 } from './../services/security';

const mockup = process.env.NEXT_PUBLIC_MOCKUP === 'true';
const mockupDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const types = {
  fisica: 'fisica',
  juridica: 'juridica',
  credenciales: 'credenciales',
  empadronamientoBIND: 'EmpadronamientoBIND', //jubilo
};

const screens = {
  instructions: 'instructions',
  form: 'form',
  checklist: 'checklist',
  camera: 'camera',
  otp: 'otp',
  empty: 'empty',
  cameraBlocked: 'camera-blocked',
};

const status = {
  pending: '1',
  approved: '2',
  rejected: '3',
  validation: '4',
  pendingCredentials: '5',
  errorBind: '6',
};

const get = async () => {
  if (mockup) {
    console.log('Get (Mockup)');
    await mockupDelay();
    return {
      nombres: 'Emma Isabel',
      apellidos: 'VIGNOLES DEFAGOT',
      calle: 'BELGRANO',
      numeracion: '853',
      municipalidad: 'MARCOS JUáREZ',
      provincia: 'CORDOBA',
      documento: 31242402,
      fechaNacimiento: '03/09/1984',
      cuil: '27-31242402-4',
      cbu: '3220001881007553170113',
      codigoPostal:'2624',
      telefono: '3413632119',
    };
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const create = async (
  frente,
  dorso,
  genero = null,
  documento = null,
  documentotramite = null
) => {
  frente = await compressBase64Image(frente, 0.6);
  frente = frente.substr(frente.indexOf(',') + 1);

  dorso = await compressBase64Image(dorso, 0.6);
  dorso = dorso.substr(dorso.indexOf(',') + 1);

  if (mockup) {
    console.log('Create (Mockup)');
    await mockupDelay();
    return {
      error: false,
      codigo: 'PDF417_NO_ENCONTRADO',
      data: { id: '0f8fad5b-d9cb-469f-a165-70867728950e' },
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes`;
  const data = {
    entidadId: sessionStorage.getItem('entidad'),
    frente: frente,
    dorso: dorso,
    genero: genero,
    documento: documento,
    documentotramite: documentotramite,
    tipoSolicitud: sessionStorage.getItem('type'),
  };

  const response = await http.post(url, data);
  return response;
};

const createJuridica = async (nombre, cuit, rubro, email, telefono) => {
  if (mockup) {
    console.log('CreateJuridica (Mockup)');
    await mockupDelay();
    return true;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudespj`;
  const data = {
    entidadId: sessionStorage.getItem('entidad'),
    nombreFantasia: nombre,
    cuit: cuit,
    rubro: rubro,
    email: email,
    telefono: telefono,
  };

  const response = await http.post(url, data);
  if (!response.error) {
    const solicitud = response.data.id;
    sessionStorage.setItem('solicitud', solicitud);
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateGestor = async () => {
  if (mockup) {
    console.log('UpdateGestor (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const gestor = sessionStorage.getItem('gestor');

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/update-gestor`;
  const data = {
    gestor: gestor,
  };

  await http.patch(url, data);

  return true;
};

const updateRef_Id = async () => {
  if (mockup) {
    console.log('UpdateRef_Id (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const ref_id = sessionStorage.getItem('ref_id');

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/update-refId`;
  const data = {
    externalRefId: ref_id,
  };

  await http.patch(url, data);

  return true;
};

const updateMorfologia = async () => {
  if (mockup) {
    console.log('UpdateMorfologia (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/addalia/morfologia`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateListaNegra = async () => {
  if (mockup) {
    console.log('UpdateListaNegra (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/lista-negra-interna`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateListaNegraBind = async () => {
  if (mockup) {
    console.log('UpdateListaNegraBind (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/lista-negra-bind`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateListaBlanca = async () => {
  if (mockup) {
    console.log('UpdateListaBlanca (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/lista-blanca-interna`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateRenaper = async () => {
  if (mockup) {
    console.log('UpdateRenaper (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/renaper`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updatePruebaVida = async (video) => {
  if (mockup) {
    console.log('UpdatePruebaVida (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/addalia/prueba-vida`;
  const data = {
    video: video && video.substr(video.indexOf(',') + 1),
  };

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEmail = async (email) => {
  if (mockup) {
    console.log('UpdateEmail (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email`;
  const data = {
    email: email,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const sendEmailOtp = async () => {
  if (mockup) {
    console.log('SendEmailOtp (Mockup)');
    await mockupDelay();
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/5e822e52-4ea9-4a6b-5644-08dba35109eb/contacto/email/otp`;
      const data = {};
    
      const response = await http.post(url, data);
      if (!response.error) {
      }
      
    } catch (error) {
      
    }
    finally{
      return true;
    
    }
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email/otp`;
  const data = {};

  const response = await http.post(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const validateEmailOtp = async (otp) => {
  if (mockup) {
    console.log('ValidateEmailOtp (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email/otp`;
  const data = {
    otp: otp,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  if (response.codigo === 'OTP_INCORRECTO') {
    return false;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEmailScoring = async () => {
  if (mockup) {
    console.log('UpdateEmailScoring (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email/scoring`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateTelefono = async (telefono) => {
  if (mockup) {
    console.log('UpdateTelefono (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono`;
  const data = {
    telefono: telefono,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateTelefonoScoring = async () => {
  if (mockup) {
    console.log('UpdateTelefonoScoring (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono/scoring`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const sendTelefonoOtp = async () => {
  if (mockup) {
    console.log('SendTelefonoOtp (Mockup)');
    await mockupDelay();

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/5e822e52-4ea9-4a6b-5644-08dba35109eb/contacto/telefono/otp`;
      const data = {};
    
      const response = await http.post(url, data);
      if (!response.error) {
      }
      
    } catch (error) {
      
    }
    finally{
      return true;
    
    }
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono/otp`;
  const data = {};

  const response = await http.post(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const validateTelefonoOtp = async (otp) => {
  if (mockup) {
    console.log('ValidateTelefonoOtp (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono/otp`;
  const data = {
    otp: otp,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  if (response.codigo === 'OTP_INCORRECTO') {
    return false;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const update = async (
  estadoCivil,
  esPEP,
  esFacta,
  esOcde,
  esUif,
  aceptaTyc,
  aceptaTycBanco,
  comercioNombre,
  comercioCalle,
  comercioNumeracion,
  comercioLocalidad,
  comercioProvincia,
  comercioCodigoPostal,
  comercioMunicipalidad
) => {
  if (mockup) {
    console.log('Update (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}`;
  const data = {
    estadoCivil: estadoCivil,
    esPEP: esPEP,
    esFacta: esFacta,
    esOcde: esOcde,
    esUif: esUif,
    aceptaTyc: aceptaTyc,
    aceptaTycBanco: aceptaTycBanco,
    nombreFantasia: comercioNombre,
    comercioCalle: comercioCalle,
    comercioNumeracion: comercioNumeracion,
    comercioLocalidad: comercioLocalidad,
    comercioProvincia: comercioProvincia,
    comercioCodigoPostal: comercioCodigoPostal,
    comercioMunicipalidad: comercioMunicipalidad,
  };

  const response = await http.put(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updatePadronA5 = async () => {
  if (mockup) {
    console.log('UpdatePadronA5 (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/afip/a5`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateSujetoObligado = async () => {
  if (mockup) {
    console.log('UpdateSujetoObligado (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/uif/sujeto-obligado`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateNosis = async () => {
  if (mockup) {
    console.log('UpdateNosis (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/nosis`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateWorldsys = async () => {
  if (mockup) {
    console.log('UpdateWorldsys (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/worldsys/search`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateMatriz = async () => {
  if (mockup) {
    console.log('UpdateMatriz (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/matriz-riesgo`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    const estado = response.data.estado;
    sessionStorage.setItem('status', estado);

    if (estado.toString() === solicitud.status.pending) {
      return true;
    } else if (estado.toString() === solicitud.status.validation) {
      window.location.replace(`/procesando`);
      return false;
    } else {
      window.location.replace(`/error?code=RECHAZO_MATRIZ_DE_RIESGO`);
      return false;
    }
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateLegajoDigital = async () => {
  if (mockup) {
    console.log('UpdateLegajoDigital (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/legajo-digital`;
  const data = {};

  await http.patch(url, data);
  return true;
};

const updateAltaCuenta = async () => {
  if (mockup) {
    console.log('UpdateAltaCuenta (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/alta-cuenta`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  // window.location.replace(`error?code=${response.codigo}`);
  window.location.replace(`procesando`);

  return false;
};

const updateCredenciales = async (usuario, password) => {
  password = await hashSha1(password);

  if (mockup) {
    console.log('UpdateCredenciales (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/credenciales`;
  const data = {
    usuario: usuario,
    password: password,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateDispositivo = async (urlPJ) => {
  if (mockup) {
    console.log('UpdateDispositivo (Mockup)');
    await mockupDelay();
    return true;
  }
  const responseIp = await http.getPublic('https://geolocation-db.com/json/');

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes${
    urlPJ ?? ''
  }/${id}/dispositivo`;
  const data = {
    ip: responseIp?.data?.IPv4 ?? '',
    dispositivo: window?.navigator?.userAgent ?? '',
  };
  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }
  return false;
};

const updateCuentaComitente = async () => {
  if (mockup) {
    console.log('UpdateCuentaComitente (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/alta-cuenta-comitente`;

  const response = await http.patch(url);

  if (!response.error) {
    return true;
  }

  return false;
};
//TODO: EDITAR ESTA FUNCION
const updateProductosBanco = async (productosBancoId) => {
  if (mockup) {
    console.log('updateProductosBanco (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/productosbanco`;

  const response = await http.patch(url, { productosBancoId });

  if (!response.error) {
    return true;
  }

  return false;
};

const updateDatosBind = async () => {
  if (mockup) {
    console.log('UpdateDatosBind (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/actualizar-datos-cliente-bind`;
  const response = await http.patch(url);

  if (!response.error) {
    return true;
  }
  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const existePersona = async () => {
  if (mockup) {
    console.log('ExistePersona (Mockup)');
    await mockupDelay();
    return true;
  }
  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/existe-persona`;
  const response = await http.patch(url);

  if (!response.error) {
    return true;
  }
  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const getCuil = async () => {
  if (mockup) {
    console.log('GetCuil (Mockup)');
    await mockupDelay();
    return {
      cuil: '',
    };
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/cuil`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateCuil = async (cuil) => {
  if (mockup) {
    console.log('UpdateCuil (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/cuil`;
  const data = {
    cuil: cuil,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const createEnrollment = async () => {
  if (mockup) {
    console.log('CreateEnrollment (Mockup)');
    await mockupDelay();
    return {
      urlEnrollment: 'https://www.google.com.ar/',
    };
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/enrollment-create`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const createAutenticacion = async () => {
  if (mockup) {
    console.log('CreateAutenticacion (Mockup)');
    await mockupDelay();
    return {
      urlAutenticacion: 'https://www.google.com.ar/',
    };
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/crear-autenticacion`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEstadoEnrollment = async () => {
  if (mockup) {
    console.log('UpdateEstadoEnrollment (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/enrollment-estado`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEstadoSimpleEnrollment = async (cancelarPrevio) => {
  if (mockup) {
    console.log('UpdateEstadoSimpleEnrollment (Mockup)');
    await mockupDelay();
    return {
      complete: false,
    };
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/enrollment-estado-simple`;
  const data = { cancelarPrevio };
  const response = await http.patch(url, data);

  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateInfoEnrollment = async () => {
  if (mockup) {
    console.log('UpdateInfoEnrollment (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/enrollment-estado-simple`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEstadoValidacion = async () => {
  if (mockup) {
    console.log('updateEstadoValidacion (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/consultar-estado-autenticacion`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateJubilo = async (aceptaTyc) => {
  if (mockup) {
    console.log('UpdateJubilo (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/update-jubilo`;
  const data = {
    aceptaTyc: aceptaTyc,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateRipsa = async (aceptaTyc) => {
  if (mockup) {
    console.log('Update-Ripsa (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/ripsa`;
  const data = {
    aceptaTyc: aceptaTyc,
  };

  const response = await http.put(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateAltaRegistroEmail = async () => {
  if (mockup) {
    console.log('UpdateAltaRegistroEmail (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/alta-registro-email`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateAltaRegistroCelular = async () => {
  if (mockup) {
    console.log('UpdateAltaRegistroCelular (Mockup)');
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/alta-registro-celular`;
  const data = {};
  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const runAction = async (action, form) => {
  switch (action.id) {
    case 'create':
      return true;

    case 'create-juridica':
      return await createJuridica(
        form.nombre,
        form.cuit,
        form.rubro,
        form.email,
        form.telefono
      );

    case 'update-lista-negra':
      return await updateListaNegra();

    case 'update-lista-negra-bind':
      return await updateListaNegraBind();

    case 'update-lista-blanca':
      return await updateListaBlanca();

    case 'update-morfologia':
      return await updateMorfologia();

    case 'update-renaper':
      return await updateRenaper();

    case 'update-prueba-vida':
      return await updatePruebaVida(form.video);

    case 'update-email':
      return await updateEmail(form.email);

    case 'update-email-scoring':
      return await updateEmailScoring();

    case 'send-email-otp':
      return await sendEmailOtp();

    case 'validate-email-otp':
      return await validateEmailOtp(form.otp);

    case 'update-telefono':
      return await updateTelefono(form.telefono);

    case 'update-telefono-scoring':
      return await updateTelefonoScoring();

    case 'send-telefono-otp':
      return await sendTelefonoOtp();

    case 'validate-telefono-otp':
      return await validateTelefonoOtp(form.otp);

    case 'update':
      return await update(
        form.estadoCivil,
        form.esPEP,
        form.esFacta,
        form.esOcde,
        form.esUif,
        form.aceptaTyc,
        form.aceptaTycBanco,
        form.comercioNombre,
        form.comercioCalle,
        form.comercioNumeracion,
        form.comercioLocalidad,
        form.comercioProvincia,
        form.comercioCodigoPostal,
        form.comercioMunicipalidad
      );

    case 'update-padron-a5':
      return await updatePadronA5();

    case 'update-sujeto-obligado':
      return await updateSujetoObligado();

    case 'update-nosis':
      return await updateNosis();

    case 'update-worldsys':
      return await updateWorldsys();

    case 'update-matriz':
      return await updateMatriz();

    case 'update-legajo-digital':
      return await updateLegajoDigital();

    case 'update-alta-cuenta':
      return await updateAltaCuenta();

    case 'update-credenciales':
      return await updateCredenciales(form.usuario, form.password);

    case 'update-dispositivo':
      return await updateDispositivo();

    case 'update-dispositivo-pj':
      return await updateDispositivo('pj');

    case 'update-cuenta-comitente':
      return await updateCuentaComitente();

    case 'update-productos-banco':
      return await updateProductosBanco(form);

    case 'update-datos-bind':
      return await updateDatosBind();

    case 'existe-persona':
      return await existePersona();

    case 'get-cuil':
      return await getCuil();

    case 'update-cuil':
      return await updateCuil(form.cuil);

    case 'create-enrollment':
      return await createEnrollment();
      
    case 'create-autenticacion':
      return await createAutenticacion();

    case 'update-estado-enrollment':
      return await updateEstadoEnrollment();

    case 'update-estado-simple-enrollment':
      return await updateEstadoSimpleEnrollment();

    case 'update-info-enrollment':
      return await updateInfoEnrollment();

    case 'update-estado-autenticacion':
      return await updateEstadoValidacion();

    case 'update-jubilo':
      return await updateJubilo(form.aceptaTyc);

    case 'update-ripsa':
      return await updateRipsa(form.aceptaTyc);

    case 'update-alta-registro-email':
      return await updateAltaRegistroEmail();

    case 'update-alta-registro-celular':
      return await updateAltaRegistroCelular();

    default:
      return false;
  }
};

const getSteps = async (client) => {
  const type = sessionStorage.getItem('type');

  switch (type) {
    case types.juridica:
      return JSON.parse(client.jsonPersonaJuridica);

    case types.credenciales:
      sessionStorage.setItem('otpReadonly', true);
      return JSON.parse(client.jsonCredenciales);

    case types.empadronamientoBIND:
      return JSON.parse(client.jsonJubilo);

    default:
      return JSON.parse(client.jsonPersonaFisica);
  }
};

export const solicitud = {
  types: types,
  screens: screens,
  status: status,
  getSteps: getSteps,
  get: get,
  getCuil: getCuil,
  updateCuil: updateCuil,
  create: create,
  createJuridica: createJuridica,
  updateGestor: updateGestor,
  updateRef_Id: updateRef_Id,
  updateMorfologia: updateMorfologia,
  updateRenaper: updateRenaper,
  updatePruebaVida: updatePruebaVida,
  updateEmail: updateEmail,
  updateEmailScoring: updateEmailScoring,
  sendEmailOtp: sendEmailOtp,
  validateEmailOtp: validateEmailOtp,
  updateTelefono: updateTelefono,
  updateTelefonoScoring: updateTelefonoScoring,
  sendTelefonoOtp: sendTelefonoOtp,
  validateTelefonoOtp: validateTelefonoOtp,
  update: update,
  updatePadronA5: updatePadronA5,
  updateSujetoObligado: updateSujetoObligado,
  updateProductosBanco: updateProductosBanco,
  updateNosis: updateNosis,
  updateWorldsys: updateWorldsys,
  updateMatriz: updateMatriz,
  updateLegajoDigital: updateLegajoDigital,
  updateCredenciales: updateCredenciales,
  updateCuentaComitente: updateCuentaComitente,
  updateDatosBind: updateDatosBind,
  existePersona: existePersona,
  createEnrollment: createEnrollment,
  createAutenticacion: createAutenticacion,
  updateEstadoEnrollment: updateEstadoEnrollment,
  updateEstadoSimpleEnrollment: updateEstadoSimpleEnrollment,
  updateInfoEnrollment: updateInfoEnrollment,
  updateJubilo: updateJubilo,
  updateRipsa: updateRipsa,
  updateAltaRegistroEmail: updateAltaRegistroEmail,
  updateAltaRegistroCelular: updateAltaRegistroCelular,
  runAction: runAction,
};
