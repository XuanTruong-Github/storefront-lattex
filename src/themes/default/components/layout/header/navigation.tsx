'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import navigationStore from '@/core/modules/navigation/store';
import collectionService from '@/core/modules/collection/service';
import { cn } from '@/core/lib/utils';

export type MenuItem = {
  handle: string;
  name: string;
  link: string;
  children: { handle: string; name: string; link: string }[];
};
type Props = {
  className?: string;
  menuActive: MenuItem | null;
  setMenuActive: any;
  setShowMenu: any;
};
export function Navigation(props: Props) {
  // Props
  const { className, menuActive, setMenuActive, setShowMenu } = props;
  // States
  const menu = navigationStore((state) => state.headerMenu.items);
  const activeStyle = 'text-primary [&>a>i]:rotate-180 [&>a>i]:rotate-180';
  // Methods
  function onShowSubMenu(item: MenuItem) {
    setMenuActive(item);
    if (item.children?.length || item.handle === 'collections') {
      setShowMenu(true);
    }
  }
  return (
    <nav className={className}>
      <section className='container'>
        <ul className='flex h-full flex-wrap items-center gap-x-6'>
          {menu?.map((item: any, key: number) => {
            if (item?.children.length > 0 || item.handle === 'collections') {
              return (
                <li
                  key={key}
                  onMouseEnter={() => {
                    onShowSubMenu(item);
                    setMenuActive(item);
                  }}
                  className={
                    menuActive?.handle === item.handle ? activeStyle : ''
                  }
                >
                  {item.link || item.handle === 'collections' ? (
                    <Link
                      href={item.link}
                      className='group inline-block text-sm leading-[56px]'
                    >
                      {item.name}
                      <i className='far fa-angle-down ml-1 duration-300 group-hover:rotate-180'></i>
                    </Link>
                  ) : (
                    <span className='group inline-block text-sm leading-[56px]'>
                      {item.name}
                      <i className='far fa-angle-down ml-1 duration-300 group-hover:rotate-180'></i>
                    </span>
                  )}
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
              >
                <Link
                  href={item.link}
                  className='inline-block text-sm leading-[56px] hover:text-primary'
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </nav>
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
  function onCloseMenu() {
    setShowMenu(false);
    setMenuActive(null);
  }
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
        'absolute left-0 top-full h-fit w-full origin-top-left border-t bg-white transition-all duration-500 ease-in-out',
        !showMenu && 'hidden'
      )}
    >
      <div
        className='h-fit w-full'
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={onCloseMenu}
      >
        <ul className='container grid w-full grid-cols-5 gap-1 py-4'>
          {menuActive?.handle !== 'collections' &&
            menuActive?.children.map((item: any, key: number) => (
              <li key={key}>
                <Link
                  href={item.link}
                  className='line-clamp-1 rounded-lg px-3 py-2 text-sm capitalize leading-7 hover:bg-secondary hover:text-primary'
                  onClick={() => setShowMenu(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          {menuActive?.handle === 'collections' &&
            collections.data?.map((item: any, key: number) => (
              <li key={key}>
                <Link
                  href={`${item.link}?page=1&limit=20`}
                  className='line-clamp-1 rounded-lg px-3 py-2 text-sm capitalize leading-7 hover:bg-secondary hover:text-primary'
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
