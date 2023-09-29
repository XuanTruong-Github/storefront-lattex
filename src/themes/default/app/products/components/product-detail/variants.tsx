'use client';
import { Button } from '@/core/components/ui/button';
import type { Product } from '@/core/modules/product/type';
type Props = {
  product: Product;
};
export default function Varriants({ product }: Props) {
  return (
    <div className=''>
      {product.configurable_options?.map((option, key: number) => (
        <div key={key}>
          <label htmlFor=''>{option.label}</label>
          <ul className='flex flex-wrap gap-2'>
            {option.values?.map((item)=> <Button variant={'outline'} key={item.value_index}>{item.label}</Button>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
