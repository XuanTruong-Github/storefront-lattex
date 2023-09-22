'use client';
import { Button } from 'ui/button';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
import productStore from '@/core/modules/product/store';

type Props = {
  className?: string;
};
export default function BuyNow({ className }: Props) {
  const iconCard = 'fas fa-credit-card text-xl';
  const iconLoading = 'fas fa-spinner-third animate-spin';
  const loading = false;
  const product = productStore((state) => state.product);
  function onClick() {
    console.log(product);
  }
  return (
    <Button
      variant='destructive'
      className={cn(
        'btn-add-to-card h-14 gap-x-2 rounded-lg font-medium',
        className
      )}
      disabled={loading}
      onClick={onClick}
    >
      <i className={loading ? iconLoading : iconCard}></i> Buy Now
    </Button>
  );
}
