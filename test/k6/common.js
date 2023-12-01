import http from 'k6/http';

export default function () {
  const res = http.get('http://localhost:3000');
  check(res, { 'Status is 200': (r) => r.status === 200 });
  sleep(1);
}

export function uploadFile(url, filePath, destination, filename) {
  const payload = {
    files: {
      file: '@' + filePath,
    },
    destination: destination,
    filename: filename,
  };
  const response = http.post(url, payload);
  return response;
}

export function downloadFile(url, destination) {
  const downloadUrl = `${url}/${destination}`;
  const response = http.get(downloadUrl);
  return response;
}