import api from '@/core/lib/axios';

const upsellService = {
  getWidgets(data: {
    widgetType: string;
    showAt: string;
    handles: string;
    device: string;
  }) {
    const url = '/api/product-widgets/public/customize';
    return api.get(url, { params: data });
  },
};
export default upsellService;
