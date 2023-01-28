import axios from 'axios';

export const convertImageToBase64 = async (url: string) => {
  let image = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return Buffer.from(image.data).toString('base64');
};
