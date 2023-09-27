import Link from 'next/link';
import { AspectRatio } from '@/core/components/ui/aspect-ratio';
import helpers from '@/core/utils/helpers';
import Image from 'next/image';
import type { Product } from '@/core/modules/product/type';

type Props = {
  product: Product;
  closeSearchBar: any;
};
export default function ProductCard({ product, closeSearchBar }: Props) {
  return (
    <Link
      href={`/products/${product.slug}` || ''}
      className='group grid grid-cols-4 gap-x-3 border-b py-4 sm:grid-cols-6 md:gap-x-4'
      onClick={() => closeSearchBar(false)}
    >
      <AspectRatio
        ratio={1}
        className='col-span-1 overflow-hidden rounded-lg border'
      >
        <Image
          src={helpers.parseImageUrl(product.image, {
            width: 80,
            height: 80,
          })}
          alt={product.name}
          className='duration-500 group-hover:scale-110 group-hover:opacity-80'
          sizes='(min-width: 320px) 100%'
          priority
          fill
        />
      </AspectRatio>
      <div className='col-span-3 sm:col-span-5'>
        <h3 className='line-clamp-2 text-sm font-normal'>{product.name}</h3>
        <div className='flex items-center gap-x-1'>
          <strong className='text-destructive'>
            {helpers.formatMoney(product.price)}
          </strong>
        </div>
      </div>
    </Link>
  );
}
