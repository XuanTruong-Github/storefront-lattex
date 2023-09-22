'use client';
import Link from 'next/link';
import { Input } from '@/core/components/ui/input';
import { Sheet, SheetContent } from '@/core/components/ui/sheet';
import SearchLoading from './search-loading';
import SearchList from './search-list';
import { useState, Fragment, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCardType } from '@default/components/product/product-card';
import { useQuery } from '@tanstack/react-query';
import productService from '@/core/modules/product/service';
import helpers from '@/core/utils/helpers';
import { Button } from '@/core/components/ui/button';

type Props = {
  isOpen: boolean;
  setOpen: any;
};

export default function SearchBar({ isOpen = false, setOpen }: Props) {
  // States
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  // Methods
  function onOpenSearchBar(open: boolean) {
    if (!open) setKeyword('');
    setOpen(open);
  }

  async function onSearch() {
    try {
      const data: any = await productService.searchProduct(keyword, 1, 20);
      if (data && data?.hits?.hits.length) {
        const products: ProductCardType[] = data.hits.hits.map(
          (product: any) => {
            return {
              id: product?._id,
              name: product?._source?.name,
              image: helpers.parseImageUrl(product._source.image, {
                width: 80,
                height: 80,
              }),
              slug: product?._source?.sku,
              price: product?._source?.final_price,
            };
          }
        );
        return products;
      } else return [];
    } catch (error) {
      return [];
    }
  }
  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search?q=${keyword}&page=1&limit=20`);
    setOpen(false);
    setKeyword('');
  }

  // Hooks
  const { data, isLoading, isFetching }: any = useQuery({
    queryKey: ['search', keyword],
    queryFn: onSearch,
    enabled: keyword.length > 0,
    staleTime: 10000,
  });

  return (
    <Sheet open={isOpen} onOpenChange={onOpenSearchBar}>
      <SheetContent side='top' className='h-full p-4 sm:h-fit sm:p-6'>
        <div className='container h-full px-0 sm:max-w-[600px]'>
          <form
            className='relative mb-2 mt-10 md:mt-0'
            onSubmit={onSearchSubmit}
          >
            <i className='fal fa-search absolute left-4 top-1/2 z-10 -translate-y-1/2 text-secondary-foreground'></i>
            <Input
              className='rounded-3xl px-10 bg-secondary text-secondary-foreground'
              placeholder='What are you searching for?'
              value={keyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
            />
          </form>
          {keyword.length > 0 && isLoading && isFetching && (
            <Fragment>
              <label htmlFor='search' className='text-center text-xs'>
                Search results: {keyword}
              </label>
              <SearchLoading />
            </Fragment>
          )}
          {keyword.length > 0 && !isLoading && !isFetching && (
            <SearchList
              data={data}
              keyword={keyword}
              onCloseSearchBar={onOpenSearchBar}
            >
              <Button
                variant='outline'
                className='rounded-3xl'
                asChild
                onClick={() => onOpenSearchBar(false)}
              >
                <Link href={`/search?q=${keyword}&page=1&limit=20`}>
                  See all results{' '}
                  <i className='fal fa-arrow-right fa-xs ml-2'></i>
                </Link>
              </Button>
            </SearchList>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
