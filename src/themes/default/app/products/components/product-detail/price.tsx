'use client';
import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';
import type { Product } from '@/core/modules/product/type';
import { useMemo } from 'react';

type Props = {
  product: Product;
  className?: string;
};
export default function Price({ product, className }: Props) {
  const specialPrice = useMemo(() => {
    if (product.hasOwnProperty('firstVariant')) {
      return helpers.formatMoney(
        product.firstVariant?.original_final_price ||
          product.firstVariant?.price
      );
    } else
      return helpers.formatMoney(
        product?.original_final_price || product?.price
      );
  }, [product]);
  const originalPrice = useMemo(() => {
    if (
      product.firstVariant?.original_price &&
      product.firstVariant.original_price > product.firstVariant.price &&
      product.firstVariant.original_price >
        product.firstVariant.original_final_price
    ) {
      return helpers.formatMoney(product.firstVariant.original_price);
    } else return null;
  }, [product]);
  return (
    <div className={cn('flex items-start gap-x-2', className)}>
      <h2 className='text-destructive'>{specialPrice}</h2>
      {originalPrice && (
        <span className='text-xl font-medium text-gray-400 line-through'>
          {originalPrice}
        </span>
      )}
    </div>
  );
}
