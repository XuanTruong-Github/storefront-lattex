// Components
import { Fragment } from 'react';
import Breadcrumbs, {
  type BreadcrumbItem,
} from '@/core/components/global/breadcrumbs';
import ProductCard from '@default/components/product/product-card';
import ProductListPagination from './components/pagination';
import productService from '@/core/modules/product/service';
import helpers from '@/core/utils/helpers';
import Sort from './components/sort';
import type { Collection } from '@/core/modules/collection/type';
// Others

type Props = {
  searchParams: { page?: number; limit?: number; sort?: string };
  params: { slug: string };
  collection: Collection;
};

export default async function Page(props: Props) {
  // Props
  const { collection, searchParams, params } = props;

  // States
  const breadCrumbItems: BreadcrumbItem[] = [
    {
      url: `/collections`,
      title: 'Collections',
      active: false,
    },
    {
      url: `/collections/${params.slug}`,
      title: collection?.title || 'Not Found',
      active: true,
    },
  ];
  const pagination = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 16,
    length: 1,
  };

  // Methods
  async function getProducts() {
    try {
      const data: any = await productService.getProductsByCollection(
        collection,
        pagination.page,
        pagination.limit,
        searchParams.sort
      );
      if (data && data?.hits?.hits.length) {
        const products = data.hits.hits.map(({ _source }: any) => _source);
        if (
          pagination.length !=
          Math.ceil(data.hits.total.value / pagination.limit)
        ) {
          pagination.length = Math.ceil(
            data.hits.total.value / pagination.limit
          );
        }
        return {
          data: products,
          pagination,
        };
      } else
        return {
          data: [],
          pagination,
        };
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:83 ~ getProducts ~ error:', error);
      return {
        data: [],
        pagination,
      };
    }
  }
  // Hooks
  const products = await getProducts();
  return (
    <article id='collection-page' className='container py-8'>
      <Breadcrumbs data={breadCrumbItems} className='mb-6' />
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-4 md:mb-6'>
        <h2 className='font-medium opacity-80'>{collection.title}</h2>
        {products.data.length > 0 && <Sort />}
      </div>
      {products.data.length == 0 && (
        <p className='mt-20 text-center lg:text-2xl'>
          There are no products in this collection
        </p>
      )}
      {products.data.length > 0 && (
        <Fragment>
          <ul className='product-list my-10 grid grid-cols-2 gap-x-4 gap-y-8 md:my-14 md:grid-cols-3 lg:my-16 lg:min-h-[680px] lg:grid-cols-4'>
            {products.data.map((product: any, key: number) => {
              return (
                <li key={key}>
                  <ProductCard product={product} />
                </li>
              );
            })}
          </ul>
          {pagination.length > 1 && (
            <ProductListPagination pagination={pagination} />
          )}
        </Fragment>
      )}
    </article>
  );
}
