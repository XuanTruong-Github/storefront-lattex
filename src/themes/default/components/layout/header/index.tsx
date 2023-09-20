'use client';
import { Fragment, useState } from 'react';
import Logo from '@default/components/global/logo';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import TopBar from './topbar';
import Sidebar from './sidebar';
import SearchBar from './search-bar';
import MicroCart from '@default/components/cart/microcart';
import { Navigation, SubNavigation, type MenuItem } from './navigation';
import cartStore from '@/core/modules/cart/store';
import useResponsive from '@/core/hooks/useResponsive';

export default function Header() {
  const { isMobile, isDesktop } = useResponsive();
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [isOpenCart, setOpenCart] = cartStore((state) => [
    state.isOpenMicroCart,
    state.setOpenMicroCart,
  ]);
  const [menuActive, setMenuActive] = useState<MenuItem | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Fragment>
      <header className='sticky left-0 top-0 z-20 w-full border-b bg-white'>
        <TopBar />
        <div className='relative h-full w-full'>
          <section className='container grid h-14 grid-cols-3 px-1 sm:px-0 md:flex md:items-center'>
            <div className='flex h-full items-center py-1 md:min-w-[180px]'>
              {isMobile && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full md:hidden'
                  onClick={() => setOpenSidebar(true)}
                >
                  <i className='far fa-bars text-xl'></i>
                </Button>
              )}
              {isDesktop && <Logo className='h-full w-full' />}
            </div>
            <div className='flex h-full items-center justify-center md:flex-1'>
              {isMobile ? (
                <Logo className='h-full w-full py-2' />
              ) : (
                <Navigation
                  className='hidden md:flex'
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  setShowMenu={setShowMenu}
                />
              )}
            </div>
            <div className='flex items-center justify-end md:w-fit'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full'
                onClick={() => setOpenSearch(true)}
              >
                <i className='fal fa-search fa-lg'></i>
              </Button>

              <Button
                variant='ghost'
                size='icon'
                className='relative rounded-full'
                onClick={() => setOpenCart(true)}
              >
                <i className='fal fa-shopping-bag fa-lg'></i>
                <Badge
                  variant='destructive'
                  className='absolute right-0 top-0 px-1 py-0'
                >
                  2
                </Badge>
              </Button>
            </div>
          </section>
          {isDesktop && (
            <SubNavigation
              menuActive={menuActive}
              setMenuActive={setMenuActive}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          )}
        </div>
      </header>
      <Sidebar isOpen={isOpenSidebar} setOpen={setOpenSidebar} />
      <SearchBar isOpen={isOpenSearch} setOpen={setOpenSearch} />
      <MicroCart isOpen={isOpenCart} setOpen={setOpenCart} />
    </Fragment>
  );
}
