import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  contentType: 'application/json',
});
Api.defaults.timeout = 2500;
Api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  },
);
Api.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    return res;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default Api;
