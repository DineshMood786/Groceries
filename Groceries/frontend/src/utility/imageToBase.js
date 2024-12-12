import imageCompression from "browser-image-compression";

const ImageToBase64 = async (file) => {
  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  const originalImageSize = (file.size / (1024 * 1024)).toFixed(2);

  let compressedImage;
  if (originalImageSize <= 0.05) {
    compressedImage = originalImageSize;
  } else {
    compressedImage = await imageCompression(file, options);
  }

  const reader = new FileReader();
  reader.readAsDataURL(compressedImage);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => reject(err);
  });
  return data;
};

export { ImageToBase64 };
