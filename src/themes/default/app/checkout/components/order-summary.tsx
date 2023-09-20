import Image from 'next/image';
import { Fragment } from 'react';

export default function OrderSummary() {
  return (
    <Fragment>
      <h4 className='mb-4 font-medium'>Order summary</h4>
      <ul className='mb-4'>
        <li className='flex items-start gap-3 border-b py-6'>
          <Image
            src='https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043'
            alt='product'
            width={80}
            height={80}
            className='h-auto w-auto rounded-lg object-contain'
          />
          <div className='flex-1 text-sm text-gray-600'>
            <h3 className='text-sm font-medium text-foreground'>
              Micro Backpack
            </h3>
            <p>Moss</p>
            <p>5L</p>
          </div>
          <p className='font-medium'>$180.00</p>
        </li>
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
      <hr className='my-4' />
      <div className='flex items-center justify-between'>
        <label htmlFor='subtotal' className='text-sm font-normal'>
          Total
        </label>
        <p id='subtotal' className='font-medium'>
          $10.00
        </p>
      </div>
    </Fragment>
  );
}
