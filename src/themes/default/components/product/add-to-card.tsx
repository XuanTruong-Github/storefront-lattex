'use client';
import { Button } from 'ui/button';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
import productStore from '@/core/modules/product/store';

type Props = {
  className?: string;
};
export default function AddToCard({ className }: Props) {
  const iconCard = 'fal fa-shopping-cart text-xl';
  const iconLoading = 'fas fa-spinner-third animate-spin';
  const isLoading = false;
  async function onClick() {}
  return (
    <Button
      variant={'outlinePrimary'}
      className={cn('btn-add-to-card h-14 gap-x-2 rounded-lg', className)}
      disabled={isLoading}
      onClick={onClick}
    >
      <i className={isLoading ? iconLoading : iconCard}></i> Add To Card
    </Button>
  );
}
