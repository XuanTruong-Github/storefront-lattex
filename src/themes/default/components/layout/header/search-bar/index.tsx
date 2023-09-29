'use client';
import { Input } from 'ui/input';
import { Sheet, SheetContent } from 'ui/sheet';
import SearchList from './search-list';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import productService from '@/core/modules/product/service';
import type { Product } from '@/core/modules/product/type';

type Props = {
  isOpen: boolean;
  setOpen: any;
};

export default function SearchBar({ isOpen = false, setOpen }: Props) {
  // States
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  // Methods
  const onOpenSearchBar = (open: boolean) => {
    if (!open) setKeyword('');
    setOpen(open);
  };
  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${keyword}&page=1&limit=20`);
    setOpen(false);
    setKeyword('');
  };

  // Hooks
  const searchQuery = useQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      try {
        const data: any = await productService.searchProduct(keyword, 1, 20);
        if (data && data?.hits?.hits.length) {
          const products: Product[] = data.hits.hits.map(
            ({ _source }: { _source: Product }) => _source
          );
          return products;
        } else return [];
      } catch (error) {
        return [];
      }
    },
    enabled: keyword.length > 0,
    staleTime: 10000,
  });

  return (
    <Sheet open={isOpen} onOpenChange={onOpenSearchBar}>
      <SheetContent side='top' className='h-full p-4 sm:h-fit sm:p-6'>
        <section className='container h-full px-0 sm:max-w-[600px]'>
          <form
            className='relative mb-2 mt-10 md:mt-0'
            onSubmit={onSearchSubmit}
          >
            <i className='fal fa-search absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-500'></i>
            <Input
              className='rounded-3xl px-10'
              placeholder='What are you searching for?'
              value={keyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
            />
          </form>
          <SearchList
            keyword={keyword}
            searchQuery={searchQuery}
            onCloseSearchBar={onOpenSearchBar}
          />
        </section>
      </SheetContent>
    </Sheet>
  );
}
