'use client';
import Slider from 'react-slick';
import Image from 'next/image';
import { AspectRatio } from 'ui/aspect-ratio';
import { useMemo, useState } from 'react';
import type { Product } from '@/core/modules/product/type';
import helpers from '@/core/utils/helpers';
import { cn } from '@/core/lib/utils';
import useResponsive from '@/core/hooks/useResponsive';
type Props = {
  product: Product;
  className?: string;
};

export function Gallery({ product, className }: Props) {
  const { isDesktop } = useResponsive();
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const activeStyle =
    '[&>.slick-list>.slick-track>.slick-current]:border [&>.slick-list>.slick-track>.slick-current]:border-primary [&>.slick-list>.slick-track>.slick-current]:rounded-md';
  const images = useMemo<string[]>(
    () =>
      product.media_gallery.map(({ image }) =>
        helpers.parseImageUrl(image, { width: 1000, height: 100 })
      ),
    [product.media_gallery]
  );
  function onInit() {}
  function onAfterChange(current: number) {}
  return (
    <div className={className}>
      <Slider
        ref={(ref) => setNav1(ref)}
        asNavFor={nav2}
        dots={false}
        arrows={false}
        speed={700}
        slidesToShow={1}
        slidesToScroll={1}
        className='mb-2'
        focusOnSelect
        infinite
      >
        {images.map((image: string, key: number) => (
          <AspectRatio key={key} ratio={1}>
            <Image
              src={image}
              alt={product.name}
              priority
              sizes='(min-width: 375px) 100%'
              className='md:rounded-lg'
              fill
            />
          </AspectRatio>
        ))}
      </Slider>
      {images.length > 1 && (
        <Slider
          ref={(ref) => setNav2(ref)}
          asNavFor={nav1}
          dots={false}
          arrows={isDesktop}
          infinite={false}
          slidesToShow={isDesktop ? 5 : 4}
          slidesToScroll={1}
          className={cn(
            'px-2 [&>.slick-list>.slick-track>.slick-slide]:!p-1',
            activeStyle
          )}
          focusOnSelect
        >
          {images.map((image: string, key: number) => (
            <AspectRatio key={key} ratio={1}>
              <Image
                src={image}
                alt={product.name}
                sizes='(min-width: 375px) 100%'
                className='md:rounded-md'
                fill
              />
            </AspectRatio>
          ))}
        </Slider>
      )}
    </div>
  );
}
