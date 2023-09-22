'use client';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { cn } from '@/core/lib/utils';
import productStore from '@/core/modules/product/store';

type Props = {
  className?: string;
};
export default function Quantity({ className }: Props) {
  const [qty, setQty] = productStore((state) => [
    state.product?.qty || 1,
    state.updateProduct,
  ]);
  function onChange(current: number) {
    setQty('qty', current);
  }
  return (
    <div
      className={cn(
        'quantity flex min-h-[48px] items-center overflow-hidden rounded-lg border',
        className
      )}
    >
      <Button
        variant='ghost'
        className='block h-full min-h-[48px] rounded-none py-0'
        onClick={() => {
          if (qty + 1 <= 100) onChange(qty + 1);
        }}
      >
        <i className='fal fa-plus md:text-lg'></i>
      </Button>
      <Input
        type='number'
        className='h-full min-h-[48px] w-10 border-none px-0 py-0 text-center font-medium input-no-buttons'
        value={qty}
        min={1}
        max={100}
        onChange={(event) => {
          const value = Number(event.target.value);
          if (value > 100) {
            return onChange(100);
          }
          if (value < 1) {
            return onChange(1);
          }
          return onChange(value);
        }}
      />
      <Button
        variant='ghost'
        className='h-full min-h-[48px] rounded-none py-0'
        onClick={() => {
          if (qty - 1) onChange(qty - 1);
        }}
      >
        <i className='fal fa-minus md:text-lg'></i>
      </Button>
    </div>
  );
}
