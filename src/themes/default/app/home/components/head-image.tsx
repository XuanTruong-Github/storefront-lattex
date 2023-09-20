'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  NextArrow,
  PrevArrow,
} from '@default/components/global/arrow-carousel';
import { Button } from '@/core/components/ui/button';
import { AspectRatio } from '@/core/components/ui/aspect-ratio';

import useResponsive from '@/core/hooks/useResponsive';
import configThemeStore from '@/themes/default/modules/config-theme/store';
import helpers from '@/core/utils/helpers';

export default function HeadImage() {
  // States
  const { isMobile, isDesktop } = useResponsive();
  const settings = configThemeStore((state) => {
    return state.settings.pages.homepage['head-image'].settings;
  });
  // Methods
  function checkRouter(config: any): string {
    if (settings?.params?.slug === 'all-lattehub-c') return '/collections';
    return '/collections/' + config?.params?.slug;
  }
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
      {settings.content.desktop.map((slide: any, key: number) => (
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
