import api from '@/core/lib/axios';
const service = {
  loadMenu(menuID: string) {
    const url = '/api/stores/public/menu/';
    return api.get(url + menuID);
  },
};
export default service;
