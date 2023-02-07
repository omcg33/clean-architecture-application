import axios from 'axios';

const instance = axios.create({
  timeout: 5000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { instance as httpsClient };
