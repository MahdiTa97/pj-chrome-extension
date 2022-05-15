import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { PathLike } from 'fs';
import qs from 'qs';
import { getStoredOptions } from '../work-with-api/storage';

const BASE_URL = 'https://core.pajoohyar.ir/';

const tokenHandler = async (config: AxiosRequestConfig<any>): Promise<void> => {
  // Get Token Functionality
  const res = await getStoredOptions();
  config!.headers!.Authorization = res?.authToken
    ? `Bearer ${res?.authToken}`
    : '';
};

const defaultOptions: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: (params: PathLike) =>
    qs.stringify(params, { indices: false }),
};

class apiCallClass {
  private api: AxiosInstance;
  private token: string;
  public delete;
  public get;
  public getUri;
  public head;
  public patch;
  public post;
  public put;
  public request;

  public constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.token = '';
    this.delete = this.api.delete;
    this.get = this.api.get;
    this.getUri = this.api.getUri;
    this.head = this.api.head;
    this.patch = this.api.patch;
    this.post = this.api.post;
    this.put = this.api.put;
    this.request = this.api.request;

    // this middleware is been called right before the http request is made.
    this.api.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
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

    // this middleware is been called right before the response is get it by the method that triggers the request
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
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
  }

  public getToken(): string {
    return `Bearer ${this.token}`;
  }

  public setToken(token: string): void {
    this.token = token;
  }
}

export default new apiCallClass(defaultOptions);
