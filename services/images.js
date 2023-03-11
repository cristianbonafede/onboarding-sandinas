import Compressor from 'compressorjs';

export const compressImage = (image, quality) => {
  return new Promise((resolve, _) => {
    new Compressor(image, {
      quality: quality,
      maxWidth: 1920,
      maxHeight: 1920,
      convertTypes: ['image/png', 'image/webp'],
      convertSize: 0,
      success: resolve,
      error: (error) => {
        console.log(error.message);
      },
    });
  });
};

export const base64toBlob = (base64) => {
  const parts = base64.split(';base64,');
  const type = parts[0].split(':')[1];
  const decodedData = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: type });
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const compressBase64Image = async (image, quality) => {
  const blob = base64toBlob(image);
  const compressedBlob = await compressImage(blob, quality);
  const compressed64 = await blobToBase64(compressedBlob);
  return compressed64;
};

export const previewImage = (base64) => {
  var newTab = window.open();
  newTab.document.body.innerHTML = `<img src="${base64}">`;
};

export const previewVideo = (base64) => {
  var newTab = window.open();
  newTab.document.body.innerHTML = `<video src="${base64}" controls="true">`;
};

export const rotateImage = (base64, clockwise) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => {
      let canvas = document.createElement('canvas');
      canvas.height = img.width;
      canvas.width = img.height;

      let context = canvas.getContext('2d');

      if (clockwise) {
        context.rotate((90 * Math.PI) / 180);
        context.translate(0, -canvas.width);
      } else {
        context.rotate((-90 * Math.PI) / 180);
        context.translate(-canvas.height, 0);
      }

      context.drawImage(img, 0, 0);

      let rotated = canvas.toDataURL();
      resolve(rotated);
    });
    img.src = base64;
  });
};
