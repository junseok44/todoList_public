export const incodeFile = (file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const base64String = _arrayBufferToBase64(arrayBuffer);
      resolve(base64String);
    };
    reader.onerror = reject;
  });
};

export const toBlob = (base64String: string) => {
  const arrayBuffer = new Uint8Array(
    atob(base64String)
      .split("")
      .map((char) => char.charCodeAt(0))
  ).buffer;
  const blob = new Blob([arrayBuffer]);

  return blob;
};

function _arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
