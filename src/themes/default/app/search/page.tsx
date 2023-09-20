import Breadcrumbs, {
  type BreadcrumbItem,
} from '@/core/components/global/breadcrumbs';
import ProductList from './components/product-list';
import ProductListPagination from './components/product-list-pagination';
import productService from '@/core/modules/product/service';
import helpers from '@/core/utils/helpers';
import type { ProductCardType } from '@default/components/product/product-card';
type Props = {
  searchParams: { q: string; page?: number; limit?: number };
};

export default async function Page({ searchParams }: Props) {
  // Props
  const keyword = searchParams.q;
  // States
  const pagination = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 20,
    length: 1,
  };
  const breadCrumbItems: BreadcrumbItem[] = [
    {
      url: `/search?q=${keyword}&page=${pagination.page}&limit=${pagination.limit}`,
      title: keyword,
      active: true,
    },
  ];
  // Methods
  async function searchProducts() {
    try {
      const data: any = await productService.searchProduct(
        keyword,
        pagination.page,
        pagination.limit
      );
      if (data && data?.hits?.hits.length) {
        const products: ProductCardType[] = data.hits.hits.map(
          (product: any) => {
            return {
              id: product?._id,
              name: product?._source?.name,
              image: helpers.parseImageUrl(product._source.image, {
                width: 200,
                height: 200,
              }),
              slug: product?._source?.sku,
              price: product?._source?.final_price,
            };
          }
        );
        if (
          pagination.length !=
          Math.ceil(data.hits.total.value / pagination.limit)
        ) {
          pagination.length = Math.ceil(
            data.hits.total.value / pagination.limit
          );
        }
        return products;
      }
      return [];
    } catch (error) {
      return [];
    }
  }
  const products = await searchProducts();
  return (
    <article id='search-page' className='container py-8'>
      <Breadcrumbs data={breadCrumbItems} className='mb-6' />
      <h1 className='mb-6 text-lg font-medium opacity-80 md:text-xl lg:text-2xl'>{`Search results for: “${keyword}”`}</h1>
      <ProductList products={products} keyword={keyword}>
        {pagination.length > 1 && (
          <ProductListPagination pagination={pagination} />
        )}
      </ProductList>
    </article>
  );
}
