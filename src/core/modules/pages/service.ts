import api from '@/core/lib/axios';
import config from 'config';
const service = {
  getPage(page: string) {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/stores/public/pages/${page}`
      : `/api/stores/public/pages/${page}`;
    return api.get(url);
  },
  getLegal(page: string) {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/stores/public/settings/legal/${page}`
      : `/api/stores/public/settings/legal/${page}`;
    return api.get(url);
  },
  sendContact(data: any) {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/contact`
      : `/api/contact`;
    return api.post(url, { content: data });
  },
  sendContactUs(data: any) {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/notifications/public/contact-us`
      : `/api/notifications/public/contact-us`;
    return api.post(url, data);
  },
};
export default service;
