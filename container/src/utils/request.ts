import axios, { AxiosRequestConfig } from 'axios';
import { objectToFormData, objectToUrlSearch } from '@/utils/formatter';

export type Opts = AxiosRequestConfig & {
  /** body格式，默认为json */
  contentType?: 'json' | 'search' | 'form';
};

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(function (response) {
  const { baseURL } = response.config;
  const result = response.data;
  if (baseURL === '/api') {
    if (result?.status === 1) {
      return result.data;
    }
  } else {
    return result;
  }
  throw { response };
});

/** 请求接口 */
const request = <T>(opts: Opts) => {
  const { contentType = 'json', ...params } = opts;
  if (!params.baseURL) {
    params.baseURL = '/api';
  }
  if (params.data instanceof FormData) {
    params.headers = {
      ...params.headers,
      'Content-Type': 'multiple/form-data; charset=UTF-8',
    };
  } else {
    if (contentType === 'search') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      };
      params.data = objectToUrlSearch(params.data, false);
    } else if (contentType === 'json') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/json; charset=UTF-8',
      };
    } else if (contentType === 'form') {
      params.data = objectToFormData(params.data);
      params.headers = {
        ...params.headers,
        'Content-Type': 'multiple/form-data; charset=UTF-8',
      };
    }
  }
  return new Promise<void | T>((resolve, reject) => {
    instance
      .request(params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) {
          return;
        }
        if (error?.response?.status === 401) {
          location.replace('#/login');
          return;
        }
        reject(error?.response?.data);
      });
  });
};

export default request;
