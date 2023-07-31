export const startCameras = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  stream.getVideoTracks().forEach((track) => track.stop());
  await new Promise(resolve => setTimeout(resolve, 1000));
};


export const loadCameras = async () => {
  try {
    let nCameras = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('La API MediaDevices no es compatible con este navegador.');
      sessionStorage.setItem('cameras', JSON.stringify(nCameras));
      return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((x) => x.kind === 'videoinput');

    for (let i = 0; i < cameras.length; i++) {
      const camera = cameras[i];
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: camera.deviceId },
      });
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      nCameras.push(capabilities);
      track.stop();
    }

    return nCameras;
  } catch (error) {
    alert('StartCamera: ' + error);
  }
};
