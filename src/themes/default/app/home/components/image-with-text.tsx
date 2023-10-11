import { cn } from '@/core/lib/utils';
import { AspectRatio } from 'ui/aspect-ratio';
import helpers from '@/core/utils/helpers';
import Image from 'next/image';
import { Button } from '@/core/components/ui/button';
import Link from 'next/link';
type Props = {
  settings: any;
  className?: string;
};
export default function ImageWithText({ settings, className }: Props) {
  console.log(settings);
  const imageURL = (url: string) =>
    helpers.parseImageUrl(url, { width: 1000, height: 1000 });
  return (
    <section className={cn('px-4', className)}>
      {settings?.blocks.map((item: any, key: number) => {
        return (
          <div
            key={key}
            className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-12 md:mb-8 lg:mb-10'
          >
            <AspectRatio
              ratio={16 / 9}
              className={cn(
                'overflow-hidden',
                item.position === 'left' ? 'md:order-first' : 'md:order-last'
              )}
            >
              <Image
                src={
                  imageURL(item.image) ||
                  'https://cdn.btdmp.com/dist/themes/3/3/images/watches.ac2e166e.svg'
                }
                alt={item.heading}
                sizes='(min-width: 375px) 100%'
                fill
                className='transition duration-700 ease-in-out hover:scale-110'
              />
            </AspectRatio>
            <div
              className={cn(
                'flex flex-col items-center justify-center md:items-start',
                item.position === 'left' ? 'md:order-last' : 'md:order-first'
              )}
            >
              <h3 className='mb-2 md:text-3xl'>{item.heading}</h3>
              <p className='mb-3 text-sm md:mb-4 md:text-base'>
                {item.content}
              </p>
              <Button className='w-52 rounded-none' asChild>
                <Link href={'/'}>{item.button_label}</Link>
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
