'use client';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';
import { Label } from 'ui/label';
import { RadioGroup, RadioGroupItem } from 'ui/radio-group';
type Props = {
  className?: string;
};
export default function Shipping({ className }: Props) {
  const shippingMethods = [
    {
      carrier_code: 'shipping-645b41e1c7dd0000094ae633',
      method_code: 'shipping-64685050f81e290009999e87',
      carrier_title: 'Standard Shipping',
      method_title: 'Standard Shipping',
      amount: '3.95',
      base_amount: '3.95',
      available: true,
      error_message: '',
      price_excl_tax: '3.95',
      price_incl_tax: '3.95',
    },
    {
      carrier_code: 'shipping-645b41e1c7dd0000094ae633',
      method_code: 'shipping-64685050f81e290s2009999e87',
      carrier_title: 'Standard Shipping',
      method_title: 'Standard Shipping',
      amount: '3.95',
      base_amount: '3.95',
      available: true,
      error_message: '',
      price_excl_tax: '3.95',
      price_incl_tax: '3.95',
    },
  ];

  return (
    <div className={cn(className)}>
      <h4>Shipping method</h4>
      <p className='mb-4 text-sm text-gray-500'>
        Calculated based on your address.
      </p>
      <RadioGroup className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3'>
        {shippingMethods.map((method: any, key: number) => (
          <div
            key={key}
            className='relative h-fit rounded-lg border p-0 text-start'
          >
            <Label
              htmlFor={method.method_code}
              className='block h-full w-full cursor-pointer p-4 pb-6 sm:pb-8 font-medium'
            >
              {method.method_title}
              <span className='mt-2 block font-normal'>$5.00</span>
            </Label>
            <RadioGroupItem
              className='absolute right-4 top-4'
              value={method.method_code}
              id={method.method_code}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
