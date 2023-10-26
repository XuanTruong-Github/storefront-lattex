import api from '@/core/lib/axios';
import config from 'config';

const orderService = {
  getOrderInfo(params: { orderId: string }) {
    const url = !config.api.url.includes('http://localhost')
      ? config.api.url + '/api/orders/public/'
      : '/api/orders/public/';
    return api.get(url + params.orderId, {
      params,
    });
  },
};
export default orderService;
