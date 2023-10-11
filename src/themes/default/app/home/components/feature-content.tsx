import Image from 'next/image';
import { AspectRatio } from 'ui/aspect-ratio';
import { cn } from '@/core/lib/utils';
import helpers from '@/core/utils/helpers';

type Props = {
  settings: any;
  className?: string;
};
type Feature = {
  image: string;
  heading: string;
  content: string;
};
export default function FeatureContent({ className, settings }: Props) {
  const { blocks, images_per_row } = settings;
  const columnsClass = 'md:grid-cols-' + images_per_row;
  const imageURL = (url: string) =>
    helpers.parseImageUrl(url, { width: 1000, height: 1000 });
  return (
    <section
      className={cn(
        'container grid grid-cols-1 gap-4',
        columnsClass,
        className
      )}
    >
      {blocks?.map((feature: Feature, key: number) => (
        <div
          key={key}
          className='flex items-center gap-4 rounded-lg bg-secondary p-4'
        >
          <div className='w-10'>
            <AspectRatio ratio={1}>
              <Image
                src={imageURL(feature.image) || '/images/no-image.jpg'}
                alt={feature.heading}
                sizes='(min-width: 375px) 100%'
                fill
              />
            </AspectRatio>
          </div>
          <div className='flex-1'>
            <h4 className='text-base font-medium md:text-lg'>
              {feature.heading}
            </h4>
            <p className='text-sm'>{feature.content}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
