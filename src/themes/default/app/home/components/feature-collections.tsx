'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/core/components/ui/button';
import ProductCard from '@default/components/product/product-card';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Navigation } from 'swiper/modules';
import {
  PrevButton,
  NextButton,
} from '@/core/components/global/swiper-buttons';
import { cn } from '@/core/lib/utils';
import { useQuery } from '@tanstack/react-query';
import useResponsive from '@/core/hooks/useResponsive';
import productService from '@/core/modules/product/service';
type Props = {
  settings: any;
  className?: string;
};

function LoadingList() {
  return (
    <div className='mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6'>
      {[...Array(4)].map((_, index: number) => (
        <Skeleton key={index} className='aspect-square' />
      ))}
    </div>
  );
}

export default function FeatureCollections({ className, settings }: Props) {
  const { isMobile, isDesktop } = useResponsive();
  const { isLoading, data } = useQuery({
    queryKey: ['feature-collection', settings?.collection?.handle],
    queryFn: async () => {
      try {
        const data: any = await productService.getProductsByCollection(
          settings?.collection,
          1,
          10
        );
        if (data && data?.hits?.hits.length) {
          const products = data.hits.hits.map(({ _source }: any) => _source);
          return products;
        }
        return [];
      } catch (error) {
        console.log(
          '🚀 ~ file: feature-collections.tsx:28 ~ queryFn: ~ error:',
          error
        );
        return [];
      }
    },
    enabled: !!settings?.collection?.handle,
  });
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
      {isLoading && <LoadingList />}
      {!isLoading && (
        <Swiper
          loop
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className='mb-4 sm:mb-8 md:mb-10'
          modules={[Navigation]}
        >
          <PrevButton
            btnType='outline'
            className='!left-0 !hidden sm:!block'
            btnClass='text-foreground'
          />
          {data?.map((product: any, key: number) => (
            <SwiperSlide key={key}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          <NextButton
            btnType='outline'
            className='!right-0 !hidden sm:!block'
            btnClass='text-foreground'
          />
        </Swiper>
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
