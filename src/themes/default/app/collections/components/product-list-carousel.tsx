'use client';
import Slider from 'react-slick';
import ProductCard from '@default/components/product/product-card';
import {
  NextArrow,
  PrevArrow,
} from '@default/components/global/arrow-carousel';
import useResponsive from '@/core/hooks/useResponsive';
type Props = {
  products: any[];
};
export default function ProductListCarousel({ products = [] }: Props) {
  const { isMobile, isDesktop } = useResponsive();

  if (!products.length) {
    return (
      <p className='text-center text-sm'>
        There are no products in this collection
      </p>
    );
  }
  if (
    (isMobile && products.length <= 4) ||
    (isDesktop && products.length <= 8)
  ) {
    return (
      <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
        {products.map((product: any, key: number) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Slider
      speed={700}
      dots={false}
      rows={2}
      slidesToShow={4}
      slidesToScroll={1}
      infinite={products.length > 12}
      arrows={isDesktop && products.length > 8}
      responsive={[
        {
          breakpoint: 768,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 639,
          settings: { slidesToShow: 2 },
        },
      ]}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      className='-mx-4'
      swipeToSlide
    >
      {products.map((product: any, key: number) => (
        <ProductCard product={product} key={key} className='mb-4 px-4' />
      ))}
    </Slider>
  );
}
