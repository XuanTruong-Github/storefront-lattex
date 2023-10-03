'use client';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';
import type { Product, ProductOption } from '@/core/modules/product/type';
type Props = {
  product: Product;
  className?: string;
};
type OptionType = {
  label: string;
  value_index: number;
};
export default function Varriants({ product, className }: Props) {
  const onSelect = (option: ProductOption, optionItem: OptionType) => {
    console.log(option, optionItem);
  };
  return (
    <div className={cn('grid grid-cols-1 gap-y-3', className)}>
      {product.configurable_options?.map((option, key: number) => (
        <div key={key}>
          <label htmlFor='' className='text-sm font-bold'>
            {option.label}
          </label>
          <ul className='mt-1 flex flex-wrap gap-2'>
            {option.values?.map((item) => {
              const HoverStyle = 'hover:bg-primary hover:text-primary-foreground hover:border-transparent'
              return (
                <Button
                  variant='outline'
                  className={HoverStyle}
                  key={item.value_index}
                  onClick={() => onSelect(option, item)}
                >
                  {item.label}
                </Button>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
