import { options } from '../../k6config.js';
import { uploadFile, downloadFile } from './common.js';

export default function () {
  const baseUrl = 'http://localhost:3000/api/files';
  const uploadResponse = uploadFile(
    `${baseUrl}/upload`,
    '/home/ryanwalker277/Music/WhatsappDemo/boticon.jpeg',
    'test',
    'test'
  );
  console.log(`Upload Response: ${uploadResponse.status}`);
  const destination = 'test';
  const downloadResponse = downloadFile(`${baseUrl}/download`, destination);
  console.log(`Download Response: ${downloadResponse.status}`);
}

export { options };