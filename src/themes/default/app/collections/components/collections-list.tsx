'use client';
import Link from 'next/link';
import ProductListCarousel from './product-list-carousel';
import { Button } from '@/core/components/ui/button';
import type { Collection } from '@/core/modules/collection/type';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../services/service';

type Props = {
  collections: Collection[];
};

export default function CollectionsList({ collections }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['collections-list'],
    queryFn: getCollections,
    initialData: collections,
  });
  if (!isLoading) {
    if (!data?.length) {
      return (
        <p className='mt-[30%] text-center text-lg'>There are no collections</p>
      );
    } else {
      return data?.map((item: any, key: number) => (
        <div key={key} className='mb-8 md:mb-10 lg:mb-16'>
          <div className='mb-6 flex items-center justify-between border-b'>
            <h3 className='line-clamp-2 max-w-[70%] border-b-2 border-b-gray-600 pb-1 text-lg font-medium sm:text-2xl'>
              {item?.collection.title}{' '}
              <span className='text-xs'>{`(${item?.total}) items`}</span>
            </h3>
            {item?.total > 0 && (
              <Link
                href={`/collections/${item?.collection.handle}?page=1&limit=20`}
                className='hidden text-sm text-blue-500 hover:font-medium sm:inline-block'
              >
                View more
              </Link>
            )}
          </div>
          <ProductListCarousel products={item?.products} />
          <div className='mt-6 text-center sm:hidden'>
            <Button variant='outline' className='rounded-3xl' asChild>
              <Link
                href={`/collections/${item?.collection.handle}?page=1&limit=20`}
              >
                View more
              </Link>
            </Button>
          </div>
        </div>
      ));
    }
  }
}
