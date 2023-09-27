import Link from 'next/link';
import { ScrollArea } from 'ui/scroll-area';
import { Skeleton } from 'ui/skeleton';
import { Button } from '@/core/components/ui/button';
import { Fragment } from 'react';
import ProductCard from './product-card';
import type { Product } from '@/core/modules/product/type';
type Props = {
  keyword: string;
  searchQuery: any;
  onCloseSearchBar: any;
};
function Loading({ keyword }: { keyword: string }) {
  return (
    <Fragment>
      <label htmlFor='search' className='text-center text-xs'>
        Search results: {keyword}
      </label>
      <ul>
        {[...Array(4)].map((_, key: number) => (
          <li key={key} className='flex items-start gap-x-3 border-b py-6'>
            <Skeleton className='aspect-square h-16 w-16 rounded-lg md:h-20 md:w-20' />
            <div className='flex-1'>
              <Skeleton className='mb-2 h-4 w-32' />
              <Skeleton className='h-4 w-16' />
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default function SearchList({
  searchQuery,
  keyword,
  onCloseSearchBar,
}: Props) {
  const { data, isFetching } = searchQuery;
  if (isFetching) return <Loading keyword={keyword} />;
  else if (keyword.length) {
    if (!data?.length) {
      return (
        <p className='mt-12 text-center sm:mt-6'>
          {`Your search "${keyword}" for did not yield any results.`}
        </p>
      );
    }
    return (
      <Fragment>
        <label htmlFor='search' className='text-center text-xs md:text-sm'>
          Search results: {keyword}
        </label>
        <ScrollArea className='mb-5 h-[calc(100%-168px)] sm:h-[400px]'>
          <ul id='search' className='grid grid-cols-1'>
            {data?.map((product: Product, key: number) => (
              <li key={key}>
                <ProductCard
                  product={product}
                  closeSearchBar={onCloseSearchBar}
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button
          variant='outline'
          className='rounded-3xl'
          asChild
          onClick={() => onCloseSearchBar(false)}
        >
          <Link href={`/search?q=${keyword}&page=1&limit=20`}>
            See all results
            <i className='fal fa-arrow-right fa-xs ml-2'></i>
          </Link>
        </Button>
      </Fragment>
    );
  }
}
