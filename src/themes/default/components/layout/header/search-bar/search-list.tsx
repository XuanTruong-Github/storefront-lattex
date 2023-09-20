import Link from 'next/link';
import Image from 'next/image';
import { AspectRatio } from '@/core/components/ui/aspect-ratio';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Fragment, type ReactNode } from 'react';
import { ProductCardType } from '@default/components/product/product-card';
import helpers from '@/core/utils/helpers';

type Props = {
  keyword: string;
  data: ProductCardType[];
  onCloseSearchBar: any;
  children: ReactNode;
};
export default function SearchList({
  data,
  keyword,
  onCloseSearchBar,
  children,
}: Props) {
  if (!data?.length) {
    return (
      <p className='mt-12 text-center sm:mt-0'>
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
          {data?.map((product: ProductCardType, key: number) => (
            <li key={key}>
              <Link
                href={product.slug}
                className='group grid grid-cols-4 gap-x-3 border-b py-4 sm:grid-cols-6 md:gap-x-4'
                onClick={() => onCloseSearchBar(false)}
              >
                <AspectRatio
                  ratio={1}
                  className='col-span-1 overflow-hidden rounded-lg border'
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    className='duration-500 group-hover:scale-110 group-hover:opacity-80'
                    sizes='(min-width: 320px) 100%'
                    priority
                    fill
                  />
                </AspectRatio>
                <div className='col-span-3 sm:col-span-5'>
                  <h3 className='line-clamp-2 text-sm font-normal'>
                    {product.name}
                  </h3>
                  <div className='flex items-center gap-x-1'>
                    <strong className='text-destructive'>
                      {helpers.formatMoney(product.price)}
                    </strong>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {children}
    </Fragment>
  );
}
