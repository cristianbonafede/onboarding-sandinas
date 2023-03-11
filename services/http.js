import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const headers = {
  'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_API_KEY,
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const nError = {
      error: true,
      codigo: error.response.data?.errores[0].codigo ?? '0',
    };
    return nError;
  }
);

const httpGet = async (url) => {
  return axios.get(url, { headers });
};

const httpGetPublic = async (url) => {
  return axios.get(url);
};
const httpPost = async (url, data) => {
  return axios.post(url, data, { headers });
};

const httpPatch = async (url, data) => {
  return axios.patch(url, data, { headers });
};

const httpPut = async (url, data) => {
  return axios.put(url, data, { headers });
};

const httpDelete = async (url) => {
  return axios.delete(url, { headers });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: httpGet,
  getPublic: httpGetPublic,
  post: httpPost,
  patch: httpPatch,
  put: httpPut,
  delete: httpDelete,
};
