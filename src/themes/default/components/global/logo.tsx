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
    const settings = state.settings?.pages?.fixed?.header;
    const desktopSrc = settings?.block[1]?.config[0]?.value;
    const mobileSrc = settings?.block[1]?.config[0]?.value;
    return {
      logo: {
        desktop: desktopSrc
          ? helpers.parseImageUrl(desktopSrc, { width: 200, height: 56 })
          : desktopSrc,
        mobile: mobileSrc
          ? helpers.parseImageUrl(mobileSrc, { width: 200, height: 56 })
          : mobileSrc,
      },
      storeName: state.manifest?.name || 'Logo',
    };
  });
  console.log(logo);
  const [isNotFound, setNotFound] = useState(false);

  if (
    (isMobile && !logo.mobile) ||
    (isDesktop && !logo.desktop) ||
    isNotFound
  ) {
    return (
      <h1 className={cn('w-fit', className)}>
        <Link
          href='/'
          className='text-xl capitalize text-primary md:text-2xl lg:text-3xl'
        >
          {storeName}
        </Link>
      </h1>
    );
  }
  if (isMobile && logo.mobile) {
    return (
      <h1 className={cn(className)}>
        <Link href='/' className='relative block h-full w-full'>
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
  } else if (isDesktop && logo.desktop) {
    return (
      <h1 className={cn(className)}>
        <Link href='/' className='relative block h-full w-full'>
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
