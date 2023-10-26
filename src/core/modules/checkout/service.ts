import api from '@/core/lib/axios';
import config from 'config';

const checkoutService = {
  getCountries() {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/stores/public/countries`
      : '/api/stores/public/countries';
    return api.get(url);
  },
  getOrderInfo(params: { orderId: string }) {
    const url = !config.api.url.includes('http://localhost')
      ? config.api.url + '/api/orders/public/'
      : '/api/orders/public/';
    return api.get(url + params.orderId, {
      params,
    });
  },
};
export default checkoutService;
