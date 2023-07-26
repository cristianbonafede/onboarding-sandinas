export const startCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter(({ kind }) => kind === 'videoinput');

  let nCameras = [];
  for (let i = 0; i < cameras.length; i++) {
    const info = cameras[i].getCapabilities();
    nCameras.push(info);
  }

  const json = JSON.stringify(nCameras);
  sessionStorage.setItem('cameras', json);

  stream.getTracks().forEach((track) => track.stop());
};
