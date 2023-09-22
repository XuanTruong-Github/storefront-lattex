'use client';
import { cn } from '@/core/lib/utils';
import { Button } from 'ui/button';
import { Input } from 'ui/input';
import { Label } from 'ui/label';
type Props = {
  className?: String;
};
export default function Discount({ className }: Props) {
  return (
    <div className={cn(className)}>
      <Label htmlFor='discount'>
        Discount code
      </Label>
      <form className='mt-1 flex space-x-2'>
        <Input id='discount' className='h-11 rounded-lg' placeholder='Enter you discount code here' />
        <Button variant={'gray'} className='h-11 rounded-lg'>
          Apply
        </Button>
      </form>
    </div>
  );
}
