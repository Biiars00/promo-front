import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL_PROD}/api/v1`
    : `${process.env.REACT_APP_API_URL_LOCAL}/api/v1`,
});
console.log('API baseURL:', api.defaults.baseURL);

export default api;