import baseAxios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://salesapi.jpelayo.dev/sales-api/dev';

export const axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  validateStatus: (status: number) => status >= 200 && status < 300,
});
