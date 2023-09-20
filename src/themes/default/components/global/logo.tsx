'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';
import configThemeStore from '@/themes/default/modules/config-theme/store';
import useResponsive from '@/core/hooks/useResponsive';
import { useState } from 'react';
type Props = {
  className?: string;
};
export default function Logo({ className }: Props) {
  const { isMobile, isDesktop } = useResponsive();
  const { logo, storeName } = configThemeStore((state) => {
    const desktopSrc =
      state.settings?.pages?.fixed?.header.block[1]?.config[0]?.value;
    const mobileSrc =
      state.settings?.pages?.fixed?.header.block[1]?.config[1]?.value;
    return {
      logo: {
        desktop: helpers.parseImageUrl(desktopSrc, { width: 200, height: 56 }),
        mobile: helpers.parseImageUrl(mobileSrc, { width: 200, height: 56 }),
      },
      storeName: state.manifest?.name || 'Logo',
    };
  });
  const [isNotFound, setNotFound] = useState(false);

  if (isMobile) {
    if (!logo.mobile || isNotFound) {
      return (
        <h1 className={cn('logo text-center', className)}>
          <Link href='/' className='logo__label text-xl'>
            {storeName}
          </Link>
        </h1>
      );
    } else if (logo.mobile && !isNotFound) {
      return (
        <h1 className={cn('logo block', className)}>
          <Link href='/' className='logo__image relative block h-full w-full'>
            <Image
              src={logo.desktop}
              alt={storeName}
              className='object-contain'
              priority
              sizes='(min-width: 320px) 100%'
              fill
            />
          </Link>
        </h1>
      );
    }
  } else if (isDesktop) {
    if (!logo.desktop || isNotFound) {
      return (
        <h1 className={cn('logo w-fit', className)}>
          <Link href='/' className='logo__label'>
            {storeName}
          </Link>
        </h1>
      );
    } else if (logo.desktop && !isNotFound) {
      return (
        <h1 className={cn('logo block', className)}>
          <Link href='/' className='logo__image relative block h-full w-full'>
            <Image
              src={logo.desktop}
              alt={storeName}
              className='object-contain'
              sizes='(min-width: 320px) 100%'
              priority
              fill
            />
          </Link>
        </h1>
      );
    }
  }
}
