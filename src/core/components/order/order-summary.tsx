'use client';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Button } from 'ui/button';
import useResponsive from '@/core/hooks/useResponsive';
import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';

type Props = {
  info: any;
  className?: string;
};
export default function OrderSummary({ info, className }: Props) {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const { isMobile, isDesktop } = useResponsive();
  const orderItems = info.items.filter((item: any) => item.handle !== 'tip');
  const toogle = () => {
    setShowFullSummary(!showFullSummary);
  };
  console.log(info);
  return (
    <div className={cn(className)}>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-lg font-medium'>Order summary</h2>
        {isMobile && (
          <Button
            variant={'link'}
            className='h-fit p-0 text-xs !no-underline lg:hidden'
            onClick={toogle}
          >
            {showFullSummary ? 'Hide' : 'Show'} full summary
          </Button>
        )}
      </div>
      {(showFullSummary || isDesktop) && (
        <Fragment>
          <ul className='mb-4'>
            {orderItems.map((item: any, key: number) => (
              <li key={key} className='flex items-start gap-3 border-b py-6'>
                <Image
                  src={helpers.parseImageUrl(item.image, {width: 200, height: 200})}
                  alt='product'
                  width={60}
                  height={60}
                  className='h-auto w-auto rounded-lg object-contain'
                />
                <div className='flex-1 text-sm text-gray-600'>
                  <h3 className='text-sm font-medium text-foreground'>
                    {item.title}
                  </h3>
                  <p>Moss</p>
                  <p>5L</p>
                </div>
                <p className='font-medium'>$180.00</p>
              </li>
            ))}
          </ul>
          <div className='mb-2 flex items-center justify-between text-sm'>
            <label htmlFor='subtotal' className='font-normal'>
              Subtotal
            </label>
            <p id='subtotal' className='font-medium'>
              $320.00
            </p>
          </div>
          <div className='mb-2 flex items-center justify-between text-sm'>
            <label htmlFor='subtotal' className='font-normal'>
              Shipping
            </label>
            <p id='subtotal' className='font-medium'>
              $10.00
            </p>
          </div>
        </Fragment>
      )}

      <hr className='my-4' />
      <div className='flex items-center justify-between'>
        <label htmlFor='total' className='font-medium'>
          Total
        </label>
        <p id='total' className='text-xl font-bold'>
          $10.00
        </p>
      </div>
    </div>
  );
}
