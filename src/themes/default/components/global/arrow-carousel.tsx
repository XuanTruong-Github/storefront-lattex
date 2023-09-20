'use client';
import type { CustomArrowProps } from 'react-slick';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';

type Props = {
  customClass?: string;
};

export function PrevArrow({ onClick, customClass }: CustomArrowProps & Props) {
  return (
    <Button
      variant='default'
      className={cn(
        'grid place-items-center rounded-full opacity-60',
        'absolute -left-8 top-1/2 z-10 -translate-y-1/2',
        'delay-100 duration-300 ease-in-out hover:transition md:hover:scale-125',
        customClass
      )}
      onClick={onClick}
    >
      <i className='far fa-chevron-left'></i>
    </Button>
  );
}

export function NextArrow({ onClick, customClass }: CustomArrowProps & Props) {
  return (
    <Button
      variant='default'
      className={cn(
        'grid place-items-center rounded-full opacity-60',
        'absolute -right-8 top-1/2 z-10 -translate-y-1/2',
        'delay-100 duration-300 ease-in-out hover:transition md:hover:scale-125',
        customClass
      )}
      onClick={onClick}
    >
      <i className='far fa-chevron-right'></i>
    </Button>
  );
}
