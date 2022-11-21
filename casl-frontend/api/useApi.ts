import axios from 'axios';

type TUrl = string;
export type TMethod = 'get' | 'post';

interface IApiOptions {
  body?: any;
  params?: any;
  headers?: any;
}

export const api = (url: TUrl, method: TMethod, options?: IApiOptions) => {
  if(!options) {
    return axios[method](url)
  }
  const { body, ...rest } = options;
  return axios[method](url, body ? body : undefined, rest)
}