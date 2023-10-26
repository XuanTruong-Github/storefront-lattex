'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import navigationStore from '@/core/modules/navigation/store';
import collectionService from '@/core/modules/collection/service';
import { cn } from '@/core/lib/utils';
import { useState } from 'react';
export type MenuItem = {
  handle: string;
  name: string;
  link: string;
  children: { handle: string; name: string; link: string }[];
};
type Props = {
  className?: string;
};

function CollectionsMenu({
  isShow,
  setClose,
  setActive,
}: {
  isShow: boolean;
  setClose: (value: boolean) => void;
  setActive: (value: any) => void;
}) {
  const collectionMenuItem = navigationStore((state) =>
    state.headerMenu.items.find((item: any) => item.handle === 'collections')
  );
  const onMouseEnter = () => {
    setActive(collectionMenuItem);
  };
  const onMouseLeave = () => {
    setClose(false);
    setActive(null);
  };
  const collections = useQuery({
    queryKey: ['collections-navigation'],
    queryFn: async () => {
      try {
        const { data } = await collectionService.getCollections();
        if (!data) return [];
        if (data?.collections.length) {
          const result = data.collections.map((collection: any) => ({
            handle: collection.handle,
            link: `/collections/${collection.handle}`,
            name: collection.title,
          }));
          return result;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  return (
    <section
      className={cn(
        'absolute left-0 top-full hidden h-fit w-full origin-top-left bg-white transition-all duration-500 ease-in-out',
        isShow && 'block'
      )}
    >
      <div
        className='h-fit w-full'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ul className='container grid w-full grid-cols-4 gap-1 border-t py-2 lg:grid-cols-5'>
          {collections.data?.map((item: any, key: number) => (
            <li key={key}>
              <Link
                href={`${item.link}?page=1&limit=20`}
                className='line-clamp-1 rounded-lg text-sm font-medium capitalize leading-10 hover:text-primary'
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='fixed left-0 z-[19] h-full w-full cursor-pointer bg-black/40 backdrop-blur-md transition-all duration-300'></div>
    </section>
  );
}

export default function Navigation({ className }: Props) {
  const [active, setActive] = useState<MenuItem | null>(null);
  const [showCollecitonsMenu, setShowCollecitonsMenu] = useState(false);
  const [menu, hasCollections] = navigationStore((state) => {
    const menu = state.headerMenu.items;
    const hasCollections =
      state.headerMenu.items.find(
        (item: any) => item.handle === 'collections'
      ) != undefined;
    return [menu, hasCollections];
  });

  return (
    <nav
      className={cn('relative hidden h-full w-full md:block', className)}
      onMouseLeave={() => setShowCollecitonsMenu(false)}
    >
      <section className='container h-fit'>
        <ul className='flex h-full flex-wrap items-center'>
          {menu?.map((item: MenuItem, key: number) => {
            if (item?.children?.length) {
              return (
                <li
                  key={key}
                  className='collapsible relative text-sm'
                  onMouseEnter={() => {
                    setActive(item);
                    if (item.handle === 'collections')
                      setShowCollecitonsMenu(true);
                  }}
                  onMouseLeave={() => {
                    setActive(null);
                  }}
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      className={cn(
                        'inline-block px-3 leading-[48px] hover:text-primary',
                        active?.handle === item.handle &&
                          'text-primary [&>i]:rotate-180'
                      )}
                    >
                      {item.name}
                      <i className='far fa-angle-down ml-2 duration-300 group-hover:rotate-180'></i>
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        'inline-block px-3 leading-[48px] hover:text-primary',
                        active?.handle === item.handle &&
                          'text-primary [&>i]:rotate-180'
                      )}
                    >
                      {item.name}
                      <i className='far fa-angle-down ml-2 duration-300 group-hover:rotate-180'></i>
                    </span>
                  )}
                  {item.handle !== 'collections' && (
                    <ul className='collapsible-content absolute left-0 top-full min-w-full bg-background shadow-md overflow-hidden rounded-br-md rounded-bl-md'>
                      {item.children.map((subItem: any, subKey: number) => (
                        <li key={subKey} className='border-b border-gray-100'>
                          <Link
                            href={subItem.link}
                            className='inline-block w-full px-4 py-3 hover:text-primary'
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            } else {
              return (
                <li
                  key={key}
                  className='text-sm hover:text-primary'
                  onMouseEnter={() => setShowCollecitonsMenu(false)}
                >
                  <Link
                    href={item.link}
                    className='inline-block px-3 leading-[48px]'
                  >
                    {item.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </section>
      {hasCollections && (
        <CollectionsMenu
          isShow={showCollecitonsMenu}
          setClose={setShowCollecitonsMenu}
          setActive={setActive}
        />
      )}
    </nav>
  );
}
