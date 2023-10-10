'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';
import configThemeStore from '@/themes/default/modules/config-theme/store';
import { useState } from 'react';

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  const [logoSrc, storeName] = configThemeStore((state) => {
    const src =
      state.settings?.pages?.fixed?.footer?.block[0]?.config[3]?.value;
    const storeName = state.manifest?.name || 'Store';
    const logo = src
      ? helpers.parseImageUrl(src, { width: 200, height: 58 })
      : src;
    return [logo, storeName];
  });

  const [notFoundImage, setNotFoundImage] = useState(true);
  const onError = () => {
    setNotFoundImage(false);
  };

  return (
    <Link href='/' className={cn('logo inline-block', className)}>
      {logoSrc && notFoundImage ? (
        <Image
          src={logoSrc}
          alt={storeName}
          width={200}
          height={58}
          onError={onError}
        />
      ) : (
        <span className='logo-label text-2xl font-black text-primary'>{storeName}</span>
      )}
    </Link>
  );
}
