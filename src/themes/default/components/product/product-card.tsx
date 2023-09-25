import Link from 'next/link';
import Image from 'next/image';
import { AspectRatio } from 'ui/aspect-ratio';
import helpers from '@/core/utils/helpers';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
type Props = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: Props) {
  const specialPrice = () => {
    if (product.hasOwnProperty('firstVariant')) {
      return helpers.formatMoney(
        product.firstVariant?.original_final_price ||
          product.firstVariant?.price
      );
    } else
      return helpers.formatMoney(
        product?.original_final_price || product?.price
      );
  };
  const originalPrice = () => {
    if (
      product.firstVariant?.original_price &&
      product.firstVariant.original_price > product.firstVariant.price &&
      product.firstVariant.original_price >
        product.firstVariant.original_final_price
    ) {
      return helpers.formatMoney(product.firstVariant.original_price);
    } else return null;
  };
  return (
    <Link
      href={'/products/' + product.slug}
      className={cn('group block h-full', className)}
      title={product.name}
    >
      <AspectRatio
        ratio={1}
        className='mb-2 overflow-hidden rounded-lg group-hover:opacity-80'
      >
        <Image
          src={helpers.parseImageUrl(product.image, {
            width: 320,
            height: 320,
          })}
          alt={product.name}
          className='duration-500 group-hover:scale-105'
          sizes='(min-width: 320px) 100%'
          fill
        />
      </AspectRatio>
      <h3 className='mb-1 line-clamp-1 text-xs font-normal opacity-90 sm:text-sm'>
        {product.name}
      </h3>
      <div className='flex items-center gap-x-2'>
        <strong className='text-destructive'>{specialPrice()}</strong>
        {originalPrice() && (
          <span className='text-sm text-gray-400 line-through'>
            {originalPrice()}
          </span>
        )}
      </div>
    </Link>
  );
}
