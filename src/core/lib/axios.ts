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
      this.handleSuccess,
      this.handleError
    );
  }
  handleSuccess(response: AxiosResponse) {
    if (response && response.status === 404) {
      return Promise.reject(['404 not found']);
    } else {
      if (response && (response.status === 200 || response.status === 201)) {
        return Promise.resolve(response.data);
      } else return Promise.reject(response);
    }
  }
  handleError(error: AxiosError) {
    return Promise.reject(error?.response?.data);
  }
}
const api = new API().instance;
export default api;
