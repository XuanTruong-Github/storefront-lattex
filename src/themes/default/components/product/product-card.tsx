import Link from 'next/link';
import Image from 'next/image';
import { AspectRatio } from '@/core/components/ui/aspect-ratio';
import helpers from '@/core/utils/helpers';
import { cn } from '@/core/lib/utils';

export type ProductCardType = {
  id: string;
  image: string;
  name: string;
  price: number;
  slug: string;
};
type Props = {
  product: ProductCardType;
  className?: string;
};

export default function ProductCard({ product, className }: Props) {
  return (
    <Link
      href={'/products/' + product.slug}
      className={cn('group block h-full', className)}
      title={product.name}
    >
      <AspectRatio
        ratio={1}
        className='mb-2 overflow-hidden rounded-lg group-hover:opacity-80'
      >
        <Image
          src={product.image}
          alt={product.name}
          className='duration-500 group-hover:scale-105'
          sizes='(min-width: 300px) 100%'
          fill
        />
      </AspectRatio>
      <h3 className='mb-1 line-clamp-1 text-xs font-normal opacity-90 sm:text-sm'>
        {product.name}
      </h3>
      <div className='flex items-center gap-x-2'>
        <strong className='text-destructive'>
          {helpers.formatMoney(product.price)}
        </strong>
        <span className='text-sm text-gray-400 line-through'>
          {helpers.formatMoney(product.price)}
        </span>
      </div>
    </Link>
  );
}
