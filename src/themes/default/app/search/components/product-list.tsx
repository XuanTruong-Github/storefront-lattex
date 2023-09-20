import { Fragment, type ReactNode } from 'react';
import ProductCard, {
  ProductCardType,
} from '@default/components/product/product-card';
import ProductListPagination from './product-list-pagination';
type Props = {
  products: Array<ProductCardType>;
  keyword: string;
  children: ReactNode;
};
export default function ProductList({ products, keyword, children }: Props) {
  if (!products.length) {
    return <p>{`Your search "${keyword}" for did not yield any results.`}</p>;
  }
  return (
    <Fragment>
      <ul className='product-list my-10 grid grid-cols-2 gap-x-4 gap-y-8 md:my-14 md:grid-cols-3 lg:my-16 lg:min-h-[680px] lg:grid-cols-4'>
        {products.map((product: any, key: number) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
      {children}
    </Fragment>
  );
}
