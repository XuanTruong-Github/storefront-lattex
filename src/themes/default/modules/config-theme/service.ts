import api from '@/core/lib/axios';
import config from 'config';
const service = {
  getConfigTheme() {
    // const url =
    //   host.host +
    //   `/api/stores/public/onlinestore/themes/page?include=preference,payment,manifest`;
    const url = !config.api.url.includes('http://localhost')
      ? config.api.url +
        `/api/stores/public/onlinestore/themes/page?include=preference,payment,manifest`
      : `/api/stores/public/onlinestore/themes/page?include=preference,payment `;
    return api.get(url);
  },
};
export default service;
