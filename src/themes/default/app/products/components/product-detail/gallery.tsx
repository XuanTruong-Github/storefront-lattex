'use client';
import Image from 'next/image';
import { AspectRatio } from 'ui/aspect-ratio';
import { Pagination, FreeMode, Thumbs } from 'swiper/modules';
import helpers from '@/core/utils/helpers';
import useResponsive from '@/core/hooks/useResponsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMemo, useState } from 'react';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
type Props = {
  product: Product;
  className?: string;
};

export function Gallery({ product, className }: Props) {
  const { isDesktop } = useResponsive();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const images = useMemo<string[]>(
    () =>
      product.media_gallery.map(({ image }) =>
        helpers.parseImageUrl(image, { width: 1000, height: 100 })
      ),
    [product.media_gallery]
  );

  return (
    <div className={className}>
      <Swiper
        slidesPerView={1}
        pagination={{
          type: 'fraction',
        }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[Pagination, FreeMode, Thumbs]}
        className={cn(
          'mb-2',
          '[&>.swiper-pagination]:rounded-3xl',
          '[&>.swiper-pagination]:bg-secondary',
          '[&>.swiper-pagination]:text-secondary-foreground',
          '[&>.swiper-pagination]:text-sm',
          '[&>.swiper-pagination]:px-2',
          '[&>.swiper-pagination]:py-[2px]',
          '[&>.swiper-pagination]:w-fit',
          '[&>.swiper-pagination]:right-2',
          '[&>.swiper-pagination]:left-[unset]'
        )}
      >
        {images.map((image: string, key: number) => (
          <SwiperSlide key={key}>
            <AspectRatio ratio={1}>
              <Image
                src={image}
                alt={product.name}
                priority
                sizes='(min-width: 375px) 100%'
                fill
              />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='px-1'>
        <Swiper
          spaceBetween={8}
          slidesPerView={isDesktop ? 5 : 4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
        >
          {images.map((image: string, key: number) => (
            <SwiperSlide key={key}>
              <AspectRatio ratio={1} className={cn()}>
                <Image
                  src={image}
                  alt={product.name}
                  sizes='(min-width: 375px) 100%'
                  fill
                />
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
