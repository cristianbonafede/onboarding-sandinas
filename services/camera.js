export const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });

    let nCameras = [];
    const tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
      const capabilities = tracks[i].getCapabilities();
      nCameras.push(capabilities);
      tracks[i].stop();
    }

    const json = JSON.stringify(nCameras);
    sessionStorage.setItem('cameras', json);
  } catch (error) {
    alert('StartCamera: ' + error);
  }
};
