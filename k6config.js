export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
  tags: {
    environment: 'staging',
  },
};