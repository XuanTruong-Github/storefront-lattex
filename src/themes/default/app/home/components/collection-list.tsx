import { cn } from '@/core/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from 'ui/aspect-ratio';
import helpers from '@/core/utils/helpers';

type Props = {
  settings: any;
};
export default function CollectionList({ settings }: Props) {
  const { item_per_row, blocks } = settings;
  const preloadClasses = `md:grid-cols-${item_per_row}`;
  const imageURL = (url: string) =>
    helpers.parseImageUrl(url, { width: 320, height: 320 });
  console.log(settings);
  return (
    <section className='container py-8 lg:py-10'>
      <h2 className='mb-4 text-center text-xl md:text-2xl lg:text-3xl'>
        <Link href={''}>{settings.heading}</Link>
      </h2>
      <div
        className={cn('grid grid-cols-2 gap-4 md:grid-cols-4', preloadClasses)}
      >
        {blocks?.map((collection: any, key: number) => (
          <Link href={''} key={key} className='group'>
            <AspectRatio
              ratio={1}
              className='mb-1 cursor-pointer group-hover:opacity-80'
            >
              <Image
                src={imageURL(collection.image)}
                alt={collection.title}
                sizes='(min-width: 375px) 100%'
                fill
                className='rounded'
              />
            </AspectRatio>
            <p className='text-center font-medium'>{collection.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
