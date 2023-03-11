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
    await mockupDelay();
    return {
      nombres: 'Juan Carlos',
      apellidos: 'Perez',
      calle: '9 de Julio',
      numeracion: '4752',
      municipalidad: 'Ciudad de Mendoza',
      provincia: 'Mendoza',
      documento: 12345678,
      fechaNacimiento: '01/01/1990',
      cuil: '20-12341234-5',
      cbu: '1234123412341234123412',
      telefono: '123456789',
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

const create = async (frente, dorso, cropFrente, cropDorso) => {
  frente = await compressBase64Image(frente, 0.6);
  frente = frente.substr(frente.indexOf(',') + 1);

  dorso = await compressBase64Image(dorso, 0.6);
  dorso = dorso.substr(dorso.indexOf(',') + 1);

  if (mockup) {
    await mockupDelay();
    return true;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes`;
  const data = {
    entidadId: sessionStorage.getItem('entidad'),
    frente: frente,
    dorso: dorso,
    cropFrente: cropFrente,
    cropDorso: cropDorso,
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

const createJuridica = async (nombre, cuit, rubro, email, telefono) => {
  if (mockup) {
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

const updateMorfologia = async () => {
  if (mockup) {
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
    await mockupDelay();
    return true;
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
    await mockupDelay();
    return true;
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

const runAction = async (action, form) => {
  switch (action.id) {
    case 'create':
      return await create(
        form.frente,
        form.dorso,
        form.cropFrente,
        form.cropDorso
      );

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
  create: create,
  createJuridica: createJuridica,
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
  updateNosis: updateNosis,
  updateWorldsys: updateWorldsys,
  updateMatriz: updateMatriz,
  updateLegajoDigital: updateLegajoDigital,
  updateCredenciales: updateCredenciales,
  runAction: runAction,
  updateCuentaComitente: updateCuentaComitente,
};
