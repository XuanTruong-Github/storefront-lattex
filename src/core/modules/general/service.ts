import api from '@/core/lib/axios';
import config from 'config';

const service = {
  getGeneral() {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/stores/public/general`
      : '/api/stores/public/general';
    return api.get(url);
  },
  getPreference() {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/stores/public/onlinestore/preference`
      : '/api/stores/public/onlinestore/preference';
    return api.get(url);
  },
};
export default service;
