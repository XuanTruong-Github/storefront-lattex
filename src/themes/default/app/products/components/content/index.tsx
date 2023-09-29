'use client';
import { Fragment, useEffect, useState } from 'react';
import Reviews from './reviews';
import Widgets from './widgets';
import type { Product } from '@/core/modules/product/type';
import productStore from '@/core/modules/product/store';

type Props = {
  product: Product;
};

export default function ProductContent({ product }: Props) {
  const setProduct = productStore((state) => state.setProduct);
  const [isLoadMore, setLoadMore] = useState(false);
  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoadMore) setLoadMore(true);
    };
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [isLoadMore]);
  if (isLoadMore)
    return (
      <Fragment>
        <Reviews productId={product.id} />
        <Widgets sku={product.sku}/>
      </Fragment>
    );
}
