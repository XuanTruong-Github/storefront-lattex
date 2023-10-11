'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/core/components/ui/button';
import { AspectRatio } from 'ui/aspect-ratio';
import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';
import useResponsive from '@/core/hooks/useResponsive';
type Props = {
  settings: any;
  className?: string;
};

export default function FeatureCollections({ className, settings }: Props) {
  const { isMobile, isDesktop } = useResponsive();
  return (
    <section className={cn('container', className)}>
      {settings.align === 'left' && isDesktop && (
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl md:text-2xl lg:text-3xl'>
            {settings?.heading}
          </h2>
          <Link
            href={
              settings?.collection?.handle
                ? `/collections/${settings?.collection.handle}`
                : '/collections'
            }
            className='text-sm font-medium text-primary'
          >
            {settings?.buttonLabel}
          </Link>
        </div>
      )}

      {(settings.align == 'center' || isMobile) && (
        <h2 className='mb-4 text-center text-xl md:text-2xl lg:text-3xl'>
          {settings?.heading}
        </h2>
      )}

      {(settings.align == 'center' || isMobile) && (
        <div className='text-center'>
          <Button className='px-8' asChild>
            <Link
              href={
                settings?.collection?.handle
                  ? `/collections/${settings?.collection.handle}`
                  : '/collections'
              }
            >
              {settings?.buttonLabel}
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
