import collectionService from '@/core/modules/collection/service';
import productService from '@/core/modules/product/service';
import type { Collection } from '@/core/modules/collection/type';
import helpers from '@/core/utils/helpers';

async function getProducts(collection: Collection) {
  try {
    const data: any = await productService.getProductsByCollection(
      collection,
      1,
      16
    );
    if (data && data?.hits?.hits.length) {
      const total = data?.hits?.total?.value || 0;
      const products = data.hits.hits.map((product: any) => {
        return {
          id: product?._id,
          name: product?._source?.name,
          image: helpers.parseImageUrl(product._source.image, {
            width: 320,
            height: 320,
          }),
          slug: product?._source?.sku,
          price: product?._source?.final_price,
        };
      });
      return {
        collection,
        products,
        total,
      };
    } else return { collection, products: [], total: 0 };
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getCollections() {
  try {
    const { collections }: any = await collectionService.getCollections();
    if (collections) {
      const data = await Promise.all(collections.map(getProducts));
      return data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
