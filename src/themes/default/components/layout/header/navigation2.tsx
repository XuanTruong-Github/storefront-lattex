'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import navigationStore from '@/core/modules/navigation/store';
import collectionService from '@/core/modules/collection/service';
import { cn } from '@/core/lib/utils';
import { Fragment } from 'react';
export type MenuItem = {
  handle: string;
  name: string;
  link: string;
  children: { handle: string; name: string; link: string }[];
};
type Props = {
  menuActive: MenuItem | null;
  setMenuActive: any;
  setShowMenu: any;
};
export function Navigation(props: Props) {
  // Props
  const { menuActive, setMenuActive, setShowMenu } = props;
  // States
  const menu = navigationStore((state) => state.headerMenu.items);

  // Methods
  function onShowSubMenu(item: MenuItem) {
    setMenuActive(item);
    if (item.children?.length || item.handle === 'collections') {
      setShowMenu(true);
    }
  }
  return (
    <section className='container h-fit'>
      <ul className='flex h-full flex-wrap items-center gap-x-6'>
        {menu?.map((item: any, key: number) => {
          if (item?.children?.length || item.handle === 'collections') {
            return (
              <li key={key} className='group relative text-sm'>
                {item.link || item.handle === 'collections' ? (
                  <Link
                    href={item.link}
                    className={cn(
                      'inline-block leading-[48px] hover:text-primary',
                      menuActive?.handle === item.handle &&
                        'text-primary [&>i]:rotate-180'
                    )}
                  >
                    {item.name}
                    <i className='far fa-angle-down ml-1 duration-300 group-hover:rotate-180'></i>
                  </Link>
                ) : (
                  <span
                    className={cn(
                      'inline-block leading-[48px] hover:text-primary',
                      menuActive?.handle === item.handle &&
                        'text-primary [&>i]:rotate-180'
                    )}
                  >
                    {item.name}
                    <i className='far fa-angle-down ml-1 duration-300 group-hover:rotate-180'></i>
                  </span>
                )}
                <ul className='absolute left-0 top-full hidden min-w-full rounded-md bg-background shadow-md group-hover:block'>
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
              </li>
            );
          }
          return (
            <li
              key={key}
              onMouseEnter={() => {
                setMenuActive(item);
                setShowMenu(false);
              }}
              onMouseLeave={() => {
                setShowMenu(false);
                setMenuActive(null);
              }}
              className='text-sm hover:text-primary'
            >
              <Link href={item.link} className='inline-block leading-[48px]'>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
export function SubNavigation(props: {
  menuActive: MenuItem | null;
  setMenuActive: any;
  showMenu: boolean;
  setShowMenu: any;
}) {
  // Props
  const { menuActive, setShowMenu, setMenuActive, showMenu } = props;
  // Methods
  const onCloseMenu = () => {
    setShowMenu(false);
    setMenuActive(null);
  };
  // Computed
  const hasCollectionsMenu = navigationStore(
    (state) =>
      state.headerMenu.items.find(
        (item: any) => item.handle === 'collections'
      ) != undefined
  );
  // Hooks
  const collections = useQuery({
    queryKey: ['collections-navigation', hasCollectionsMenu],
    queryFn: async () => {
      try {
        const data: any = await collectionService.getCollections();
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
    enabled: hasCollectionsMenu,
  });

  return (
    <section
      className={cn(
        'absolute left-0 top-full h-fit w-full origin-top-left bg-white transition-all duration-500 ease-in-out',
        !showMenu && 'hidden'
      )}
    >
      <div
        className='h-fit w-full'
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={onCloseMenu}
      >
        <ul className='container grid w-full grid-cols-4 gap-1 border-t py-2 lg:grid-cols-5'>
          {collections.data?.map((item: any, key: number) => (
            <li key={key}>
              <Link
                href={`${item.link}?page=1&limit=20`}
                className='line-clamp-1 rounded-lg text-sm font-medium capitalize leading-10 hover:text-primary'
                onClick={() => setShowMenu(false)}
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
