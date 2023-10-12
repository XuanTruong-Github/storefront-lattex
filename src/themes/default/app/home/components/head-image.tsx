'use client';
import Image from 'next/image';
import { AspectRatio } from 'ui/aspect-ratio';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/core/components/ui/button';

import useResponsive from '@/core/hooks/useResponsive';
import helpers from '@/core/utils/helpers';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  settings: any;
  className?: string;
};
export default function HeadImage({ settings, className }: Props) {
  // States
  const { isMobile, isDesktop } = useResponsive();
  const router = useRouter();
  // Memo
  const mobileData = useMemo(() => settings?.content?.mobile, [settings]);
  const desktopData = useMemo(() => settings?.content?.desktop, [settings]);
  // Methods
  const checkRouter = (config: any) => {
    if (settings?.params?.slug === 'all-lattehub-c') return '/collections';
    return '/collections/' + config?.params?.slug;
  };
  const onClick = (slide: any, typeClick: 'slide' | 'button') => {
    const url = checkRouter(slide.urlButton);
    if (settings.show_content && typeClick === 'button') {
      router.push(url);
    }
    if (!settings.show_content && typeClick === 'slide') {
      router.push(url);
    }
    if (isMobile) {
      router.push(url);
    }
  };
  return (
    <Swiper className={className}>
      {isMobile &&
        mobileData?.map((slide: any, key: number) => (
          <SwiperSlide key={key}>
            <AspectRatio
              ratio={16 / 9}
              className='h-auto max-h-[900px] w-auto cursor-pointer'
              onClick={() => onClick(slide, 'slide')}
            >
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
          </SwiperSlide>
        ))}
      {isDesktop &&
        desktopData?.map((slide: any, key: number) => (
          <SwiperSlide key={key}>
            <AspectRatio
              ratio={16 / 9}
              className='h-auto max-h-[900px] w-auto cursor-pointer'
              onClick={() => onClick(slide, 'slide')}
            >
              <Image
                src={helpers.parseImageUrl(slide.image, {
                  width: 2000,
                  height: 2000,
                })}
                alt=''
                fill
                priority
                className='z-10'
              />
              {settings.show_content && (
                <div className='absolute left-0 top-0 z-20 h-full w-full'>
                  <div className='container flex h-full items-center'>
                    <div className='w-full' style={{ textAlign: 'center' }}>
                      <h1
                        className='mb-3 font-medium lg:text-5xl xl:text-6xl'
                        style={{ color: slide.heading.color }}
                      >
                        {slide.heading.content}
                      </h1>
                      <p
                        className='mb-6 xl:text-lg'
                        style={{ color: slide.subHeading.color }}
                      >
                        {slide.subHeading.content}
                      </p>
                      <Button
                        style={{
                          backgroundColor: slide.buttonLabel.background,
                          color: slide.buttonLabel.color,
                        }}
                        onClick={() => onClick(slide, 'button')}
                      >
                        {slide.buttonLabel.title}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </AspectRatio>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
