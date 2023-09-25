import api from '@/core/lib/axios';
import config from 'config';
const collectionService = {
  getCollections(
    params: { limit: number; page: number } = {
      limit: 50,
      page: 1,
    }
  ) {
    const url = '/api/collections/public/all';
    return api.get(url, {
      params,
    });
  },
  getCollection(slug: string) {
    const url = !config.api.url.includes('http://localhost')
      ? config.api.url + '/api/collections/public/byHandle/' + slug
      : '/api/collections/public/byHandle/' + slug;
    return api.get(url);
  },
  async getCollectionFromProductID(productID: string) {
    const url = !config.api.url.includes('http://localhost')
      ? `${config.api.url}/api/collections/public/products/${productID}`
      : '/api/collections/public/products/' + productID;
    return api.get(url);
  },
};
export default collectionService;
