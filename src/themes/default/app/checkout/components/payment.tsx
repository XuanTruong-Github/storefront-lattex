'use client';
import { cn } from '@/core/lib/utils';
type Props = {
  className?: string;
};
export default function Payment({ className }: Props) {
  return (
    <div className={cn(className)}>
      <h4 className=''>Payment</h4>
      <p className='mb-4 text-sm text-gray-500'>
        Calculated based on your address.
      </p>
    </div>
  );
}
