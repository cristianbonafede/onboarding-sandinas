export const startCameras = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  stream.getVideoTracks().forEach((track) => track.stop());
};

export const loadCameras = async () => {
  let nCameras = [];

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('La API MediaDevices no es compatible con este navegador');
  }

  const devices = await navigator.mediaDevices.enumerateDevices();
  if (!devices || devices.length === 0) {
    throw new Error('No se encontraron dispositivos');
  }

  const cameras = devices.filter((x) => x.kind === 'videoinput');
  if (!cameras || cameras.length === 0) {
    throw new Error('No se encontraron camaras');
  }

  for (let i = 0; i < cameras.length; i++) {
    const camera = cameras[i];
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: camera.deviceId },
    });
    const track = stream.getVideoTracks()[0];

    const capabilities = track.getCapabilities();
    nCameras.push(capabilities);
  }

  stream.getVideoTracks().forEach((track) => track.stop());

  return nCameras;
};
