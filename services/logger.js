import http from './http';

const sendLog = async (message) => {
  const solicitudId = sessionStorage.getItem('solicitud');

  const url = `${process.env.NEXT_PUBLIC_API_URL}/logger`;
  const data = {
    message: `FRONTEND - ${solicitudId} - ${message}`,
  };

  try {
    console.log(data.message);
    await http.post(url, data);
  } catch (error) {
    console.log(error);
  }
};

export const logInformation = async (message) => {
  await sendLog(message);
};

export const logError = async (message, error) => {
  const nMessage = `ERROR - ${message} - ${error.message}`;
  await sendLog(nMessage);
};
