'use client';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';
import colors from '@/configs/colors.json';
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
  const isColorOption = ({ label }: { label: string }) =>
    label.toLowerCase() == 'color';
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
          <div className='mt-1 flex flex-wrap gap-2'>
            {isColorOption(option) && (
              <ColorVarriants variants={option.values} />
            )}
            {!isColorOption(option) &&
              option.values?.map((item) => {
                const HoverStyle =
                  'hover:bg-primary hover:text-primary-foreground hover:border-transparent';
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
          </div>
        </div>
      ))}
    </div>
  );
}

function ColorVarriants({ variants }: { variants: any }) {
  const getColor = (color: string) => {
    const item = colors.find((item) => item.label === color.toLowerCase());
    if (item?.code) {
      return {
        background: item.code,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      };
    }
    return {
      backgroundColor: color.toLowerCase(),
    };
  };
  const onClick = (variant: OptionType) => {
    console.log(variant);
  };
  return variants?.map((item: OptionType) => {
    return (
      <Button
        key={item.value_index}
        size={'icon'}
        className='border ring-ring hover:ring-2'
        style={getColor(item.label)}
        onClick={() => onClick(item)}
      ></Button>
    );
  });
}
