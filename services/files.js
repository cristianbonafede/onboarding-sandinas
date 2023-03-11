export const openBase64Pdf = (content) => {
  var byteCharacters = atob(content);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var file = new Blob([byteArray], { type: 'application/pdf;base64' });
  var fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};
