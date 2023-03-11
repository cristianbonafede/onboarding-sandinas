import http from '../services/http';

const mockup = process.env.NEXT_PUBLIC_MOCKUP === 'true';

const get = async () => {
  if (mockup) {
    return [
      {
        id: 1,
        nombre: 'Desarrollo',
      },
      {
        id: 2,
        nombre: 'Testing',
      },
    ];
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/rubros`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

export const rubro = {
  get: get,
};
