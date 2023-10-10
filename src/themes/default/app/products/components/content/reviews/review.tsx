'use client';
import { cn } from '@/core/lib/utils';
import { Dialog, DialogContent } from 'ui/dialog';
import { AspectRatio } from 'ui/aspect-ratio';
import Image from 'next/image';
import Rate from '@/core/components/global/rate';
import { useState, useMemo } from 'react';
import { Button } from '@/core/components/ui/button';
export type ReviewType = {
  customerEmail: string;
  customerName: string;
  images: string[];
  isPublished: number;
  quickReview: string;
  rating: number;
  review: string;
  reviewDate: string;
};
type Props = {
  review: ReviewType;
  className?: string;
};
export default function ReviewPost({ review, className }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const onSelectImage = (image: string) => {
    setImageSelected(image);
    setShowDialog(true);
  };
  const images = useMemo(() => review.images.filter((img) => !!img), [review]);
  return (
    <article className={cn('flex items-start gap-x-3 border-b pb-4 md:pb-6', className)}>
      <div className='w-fit'>
        <Button variant='secondary' size='icon'>
          <i className='fal fa-user text-lg'></i>
        </Button>
      </div>
      <div className='flex-1'>
        <h6 className='mb-1 text-sm opacity-80 font-medium'>{review.customerName}</h6>
        <Rate value={5} className='text-sm' />
        <span className=' text-xs text-gray-400'>{review.quickReview}</span>
        <p className='mb-2 text-sm opacity-90'>{review.review}</p>
        <div className='grid grid-cols-4 gap-2 md:grid-cols-5 lg:grid-cols-6 xl:w-3/5'>
          {images.map((image: string, key: number) => (
            <AspectRatio
              key={key}
              ratio={1}
              className='cursor-zoom-in overflow-hidden rounded'
            >
              <Image
                src={image}
                alt='Review'
                title='View'
                sizes='(min-width: 375px) 100%'
                fill
                onClick={() => onSelectImage(image)}
              />
            </AspectRatio>
          ))}
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent
            className={cn(
              'max-h-[90%] max-w-[90%] overflow-y-auto rounded-lg p-0 sm:!w-fit ',
              '[&>button]:right-2 [&>button]:top-2 [&>button]:border [&>button]:bg-white [&>button]:p-2 focus:[&>button]:!ring-0 focus:[&>button]:!ring-offset-0'
            )}
          >
            {imageSelected && (
              <Image
                src={imageSelected}
                alt='Review'
                width={1000}
                height={1000}
                className='w-full object-contain sm:w-auto'
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
