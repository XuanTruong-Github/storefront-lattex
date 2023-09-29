'use client';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
type Props = {
  product: Product;
  className?: string;
};
export default function Varriants({ product, className }: Props) {
  return (
    <div className={cn('grid grid-cols-1 gap-y-3', className)}>
      {product.configurable_options?.map((option, key: number) => (
        <div key={key}>
          <label htmlFor='' className='font-bold text-sm'>{option.label}</label>
          <ul className='flex flex-wrap gap-2 mt-1'>
            {option.values?.map((item) => <Button variant={'outline'} key={item.value_index}>{item.label}</Button>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
