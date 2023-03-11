import http from '../services/http';

const mockup = process.env.NEXT_PUBLIC_MOCKUP === 'true';

const get = async () => {
  if (1==1) {
    return [
      {
        value: 'Capital Federal',
        text: 'Capital Federal',
      },
      {
        value: 'Buenos Aires',
        text: 'Buenos Aires',
      },
      {
        value: 'Catamarca',
        text: 'Catamarca',
      },
      {
        value: 'Córdoba',
        text: 'Córdoba',
      },
      {
        value: 'Corrientes',
        text: 'Corrientes',
      },
      {
        value: 'Entre Ríos',
        text: 'Entre Ríos',
      },
      {
        value: 'Jujuy',
        text: 'Jujuy',
      },
      {
        value: 'La Rioja',
        text: 'La Rioja',
      },
      {
        value: 'Mendoza',
        text: 'Mendoza',
      },
      {
        value: 'Salta',
        text: 'Salta',
      },
      {
        value: 'San Juan',
        text: 'San Juan',
      },
      {
        value: 'San Luis',
        text: 'San Luis',
      },
      {
        value: 'Santa Fe',
        text: 'Santa Fe',
      },
      {
        value: 'Santiago del Estero',
        text: 'Santiago del Estero',
      },
      {
        value: 'Tucumán',
        text: 'Tucumán',
      },
      {
        value: 'Chaco',
        text: 'Chaco',
      },
      {
        value: 'Chubut',
        text: 'Chubut',
      },
      {
        value: 'Formosa',
        text: 'Formosa',
      },
      {
        value: 'La Pampa',
        text: 'La Pampa',
      },
      {
        value: 'Misiones',
        text: 'Misiones',
      },
      {
        value: 'Neuquén',
        text: 'Neuquén',
      },
      {
        value: 'Río Negro',
        text: 'Río Negro',
      },
      {
        value: 'Santa Cruz',
        text: 'Santa Cruz',
      },
      {
        value: 'Tierra del Fuego',
        text: 'Tierra del Fuego',
      },
      {
        value: 'Exterior',
        text: 'Exterior',
      },
    ];
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/provincias`; //todo

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

export const provincia = {
  get: get,
};
