'use client';
import { Fragment } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from 'ui/sheet';
import { Button } from 'ui/button';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  setOpen: any;
};

export default function MicroCart({ isOpen = false, setOpen }: Props) {
  const isEmpty = false;
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side='right' className='flex w-full flex-col sm:w-3/4'>
        {isEmpty && (
          <SheetHeader className='mt-4 text-start'>
            <SheetTitle> Your shopping cart is empty.</SheetTitle>
            <SheetDescription>
              {`Don't hesitate and browse our catalog to find something beautiful for You!`}
            </SheetDescription>
          </SheetHeader>
        )}
        {!isEmpty && (
          <Fragment>
            <SheetHeader className='text-start'>
              <SheetTitle> Your shopping cart</SheetTitle>
            </SheetHeader>
            <div className='flex-1'></div>
            <div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className='text-sm text-gray-500'>
                Shipping fee is calculated at checkout
              </p>

              <Button
                variant='outline'
                asChild
                className='mb-2 mt-4 h-12 w-full'
                onClick={() => setOpen(false)}
              >
                <Link href='/cart' className='uppercase'>
                  GO TO CART
                </Link>
              </Button>
              <Button
                variant='default'
                asChild
                className='h-12 w-full'
                onClick={() => setOpen(false)}
              >
                <Link href='/checkout' className='uppercase'>
                  <i className='fad fa-credit-card mr-2'></i> Check out
                </Link>
              </Button>
            </div>
          </Fragment>
        )}
      </SheetContent>
    </Sheet>
  );
}
