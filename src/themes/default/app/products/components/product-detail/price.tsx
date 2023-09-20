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
      <span className='text-xl font-medium text-gray-400 line-through'>
        {helpers.formatMoney(product.price)}
      </span>
    </div>
  );
}
