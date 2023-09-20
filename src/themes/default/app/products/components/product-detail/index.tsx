import { Gallery } from './gallery';
import Rate from '@/core/components/global/rate';
import Price from './price';
import SaleCountDown from './sale-count-down';
import Freeship from './freeship';
import AddToCard from '@default/components/product/add-to-card';
import BuyNow from '@default/components/product/buy-now';
import Quantity from '@/themes/default/components/product/quantity';
import Paypal from '@default/app/products/components/product-detail/paypal';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';

type Props = {
  product: Product;
  className?: string;
};
export default function ProductDetail({ product, className }: Props) {
  return (
    <section
      id='product-detail'
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 xl:gap-6',
        className
      )}
    >
      <Gallery product={product} className='' />
      <div className='px-4 sm:px-0'>
        <h1 className='product-name mb-2 text-2xl lg:text-3xl'>
          {product?.name}
        </h1>
        <Rate value={5} className='mb-4 text-sm' total={24} />
        <Price product={product} className='mb-4' />
        <SaleCountDown className='mb-4' />
        <Freeship className='mb-4' />
        <Quantity className='mb-4 w-fit' />
        <div className='mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
          <AddToCard className='' />
          <BuyNow className='' />
        </div>
        <Paypal />
      </div>
    </section>
  );
}
