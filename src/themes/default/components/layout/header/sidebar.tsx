'use client';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui/accordion';
import { Sheet, SheetContent } from 'ui/sheet';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import navigationStore from '@/core/modules/navigation/store';
import collectionService from '@/core/modules/collection/service';

type Props = {
  isOpen: boolean;
  setOpen: any;
};

export default function Sidebar({ isOpen = false, setOpen }: Props) {
  const menu = navigationStore((state) => state.headerMenu?.items || []);
  const hasCollectionsMenu = useMemo(
    () => !!menu.find((item: any) => item.handle === 'collections'),
    [menu]
  );
  // Hooks
  useQuery({
    queryKey: ['collections-navigation', hasCollectionsMenu],
    queryFn: async () => {
      try {
        const data: any = await collectionService.getCollections();
        if (data?.collections?.length) {
          return data.collections.map((collection: any) => ({
            handle: collection.handle,
            link: `/collections/${collection.handle}`,
            name: collection.title,
          }));
        }
        return [];
      } catch (error) {
        return Promise.reject(error);
      }
    },
    onSuccess(data) {
      menu.forEach((item: any) => {
        if (item.handle === 'collections') {
          item.children = data;
        }
      });
    },
    enabled: hasCollectionsMenu,
  });
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side='left' className=' overflow-y-auto'>
        <Accordion type='single' className='mt-8 w-full' collapsible>
          {menu?.map((item: any, key: number) => {
            if (item?.children.length)
              return (
                <AccordionItem
                  value={String(key)}
                  key={key}
                  className='border-none'
                >
                  <AccordionTrigger className='text-sm !no-underline'>
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.children.map((subItem: any, subIndex: number) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className='text-medium line-clamp-2 block py-3 pl-4'
                        onClick={() => setOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            return (
              <AccordionItem
                value={String(key)}
                key={key}
                className='border-none'
              >
                <Link
                  href={item.link}
                  className='block leading-[52px] font-medium text-sm'
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </AccordionItem>
            );
          })}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
