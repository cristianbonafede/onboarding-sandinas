export const startCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  stream.getTracks().forEach((track) => track.stop());
};
