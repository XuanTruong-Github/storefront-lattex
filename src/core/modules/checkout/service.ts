import api from '@/core/lib/axios';
import config from 'config';

const checkoutService = {
  getCountries() {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/stores/public/countries`
      : '/api/stores/public/countries';
    return api.get(url);
  },
};
export default checkoutService;
