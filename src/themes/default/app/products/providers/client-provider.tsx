'use client';

import { ReactNode, useEffect } from 'react';
import type { Product } from '@/core/modules/product/type';
import productStore from '@/core/modules/product/store';

type Props = {
  product: Product;
  children: ReactNode;
};

export default function ClientProvider({ children, product }: Props) {
  const setProduct = productStore((state) => state.setProduct);
  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);
  return children;
}
