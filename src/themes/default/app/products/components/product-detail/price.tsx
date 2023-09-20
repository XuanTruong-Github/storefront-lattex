import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';
type Props = {
  product: any;
  className?: string;
};
export default function Price({ product, className }: Props) {
  return (
    <div className={cn('flex items-start gap-x-2', className)}>
      <h2 className='text-destructive'>
        {helpers.formatMoney(product.original_final_price)}
      </h2>
      <span className='text-xl text-gray-400 font-medium line-through'>{helpers.formatMoney(product.price)}</span>
    </div>
  );
}
