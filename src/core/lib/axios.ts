import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import queryString from 'query-string';
import config from 'config';

class API {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: config.api.url,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      paramsSerializer: (params) => queryString.stringify(params),
    });
    this.instance.interceptors.response.use(
      response => response,
      this.handleError
    );
  }
  handleError(error: AxiosError) {
    return Promise.reject(error?.response);
  }
}
const api = new API().instance;
export default api;
