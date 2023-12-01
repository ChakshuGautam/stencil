import { options } from '../../k6config.js';
import { simpleGetRequest } from './common.js';
import { check, sleep } from 'k6';

export default function () {
  const url = 'http://localhost:3000';
  const response = simpleGetRequest(url);
  check(response, { 'Status is 200': (r) => r.status === 200 });
  sleep(1);
}

export { options };