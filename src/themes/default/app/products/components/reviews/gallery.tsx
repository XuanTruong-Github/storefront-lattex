'use client';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import Slider from 'react-slick';
import { Dialog, DialogContent } from '@/core/components/ui/dialog';
import { cn } from '@/core/lib/utils';
type Props = {
  images: string[];
};
export default function ReviewGallery({ images }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const onSelectImage = (image: string) => {
    setImageSelected(image);
    setShowDialog(true);
  };
  if (images.length)
    return (
      <Fragment>
        <Slider
          slidesToShow={images.length > 1 ? 2 : 1}
          rows={1}
          arrows={false}
          dots={images.length > 1}
          slidesToScroll={1}
          speed={700}
          swipe
        >
          {images.map((image: string, key: number) => (
            <Image
              src={image}
              key={key}
              alt='Review'
              width={320}
              height={320}
              className='w-full object-contain'
              onClick={() => onSelectImage(image)}
            />
          ))}
        </Slider>
        {!!imageSelected && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent
              className={cn(
                'max-h-[90%] max-w-[90%] overflow-y-auto rounded-lg p-0 sm:!w-fit ',
                '[&>button]:right-2 [&>button]:top-2 [&>button]:border [&>button]:bg-white [&>button]:p-2 focus:[&>button]:!ring-0 focus:[&>button]:!ring-offset-0'
              )}
            >
              <Image
                src={imageSelected}
                alt='Review'
                width={1000}
                height={1000}
                className='w-full object-contain sm:w-auto'
              />
            </DialogContent>
          </Dialog>
        )}
      </Fragment>
    );
}
