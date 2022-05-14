import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios';
import { PathLike } from 'fs';
import qs from 'qs';
import { getStoredOptions } from '../work-with-api/storage';

const tokenHandler = async (config: AxiosRequestConfig<any>): Promise<void> => {
  // Get Token Functionality
  const res = await getStoredOptions();
  config!.headers!.Authorization = res?.authToken
    ? `Bearer ${res?.authToken}`
    : '';
};

// Set config defaults when creating the instance
const defaultOptions: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: 'https://core.pajoohyar.ir/',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: (params: PathLike) =>
    qs.stringify(params, { indices: false }),
};

const apiClient = () => {
  // Alter defaults after instance has been created
  const instance = axios.create(defaultOptions);

  // Add a request interceptor
  instance.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      try {
        await tokenHandler(config);
        return await Promise.resolve(config);
      } catch (error) {}
    },
    (error) => {
      // Do something with request error
      console.log('=====> error <=====', error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },

    (error: AxiosError) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const { data, status, config } = error.response!;
      switch (status) {
        case 400:
          console.error(data);
          break;

        case 401:
          console.error('unauthorised');
          break;

        case 404:
          console.error('/not-found');
          break;

        case 500:
          console.error('/server-error');
          break;
      }
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  return instance;
};

export default apiClient();
