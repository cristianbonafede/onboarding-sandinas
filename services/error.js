export const redirect = (router, url) => {
  if (url !== '') {
    router.push(url);
    return;
  }

  const entidad = sessionStorage.getItem('entidad');
  const type = sessionStorage.getItem('type');
  const gestor = sessionStorage.getItem('gestor');
  const email = sessionStorage.getItem('email');
  const ref_id = sessionStorage.getItem('ref_id');

  router.push(`/?e=${entidad}&t=${type}&g=${gestor}&ref_id=${ref_id}&m=${email}`);
};
