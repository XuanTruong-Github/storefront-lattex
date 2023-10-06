'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '@/core/components/global/arrow-carousel';
import { Button } from 'ui/button';
import { AspectRatio } from 'ui/aspect-ratio';

import useResponsive from '@/core/hooks/useResponsive';
import configThemeStore from '@/themes/default/modules/config-theme/store';
import helpers from '@/core/utils/helpers';
import { useMemo } from 'react';
type Props = {
  settings: any;
};
export default function HeadImage({ settings }: Props) {
  // States
  const { isMobile, isDesktop } = useResponsive();
  // Memo
  const mobileData = useMemo(() => settings?.content?.mobile, [settings]);
  const desktopData = useMemo(() => settings?.content?.desktop, [settings]);
  // Methods
  const checkRouter = (config: any) => {
    if (settings?.params?.slug === 'all-lattehub-c') return '/collections';
    return '/collections/' + config?.params?.slug;
  };

  return (
    <Slider
      slidesToShow={1}
      slidesToScroll={1}
      arrows={isDesktop}
      infinite={true}
      lazyLoad={'ondemand'}
      draggable={true}
      swipeToSlide={true}
      nextArrow={<NextArrow customClass='right-4 xl:right-6' />}
      prevArrow={<PrevArrow customClass='left-4 xl:left-6' />}
    >
      {isMobile &&
        mobileData?.map((slide: any, key: number) => (
          <Link key={key} href='/' className='relative block w-full'>
            <AspectRatio ratio={16 / 9} className='h-auto max-h-[900px] w-auto'>
              <Image
                src={helpers.parseImageUrl(slide.image, {
                  width: 2000,
                  height: 2000,
                })}
                alt=''
                fill
                priority
              />
            </AspectRatio>
          </Link>
        ))}
      {isDesktop &&
        desktopData?.map((slide: any, key: number) => (
          <Link key={key} href='/' className='relative block w-full'>
            <AspectRatio ratio={16 / 9} className='h-auto max-h-[900px] w-auto'>
              <Image
                src={helpers.parseImageUrl(slide.image, {
                  width: 2000,
                  height: 2000,
                })}
                alt=''
                fill
                priority
              />
            </AspectRatio>
          </Link>
        ))}
    </Slider>
  );
}
