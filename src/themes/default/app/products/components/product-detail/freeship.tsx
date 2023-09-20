import { cn } from '@/core/lib/utils';
type Props = {
  className?: string;
};
export default function Freeship({ className }: Props) {
  return (
    <div
      className={cn(
        'relative border-b border-t py-3 pl-12 sm:rounded-lg sm:border md:pl-14',
        className
      )}
    >
      <i className='fal fa-truck fa-lg absolute left-3 top-5 text-destructive md:left-4 md:top-1/2 md:-translate-y-1/2'></i>
      <p>
        <strong>Free shipping</strong> on <b>Order</b> over $80
      </p>
      <p className='text-sm text-gray-500'>Dispatched on Sep 24 - Sep 29</p>
    </div>
  );
}
