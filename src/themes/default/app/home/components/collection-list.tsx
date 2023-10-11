import { cn } from '@/core/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from 'ui/aspect-ratio';
import helpers from '@/core/utils/helpers';

type Props = {
  settings: any;
  className?: string;
};
export default function CollectionList({ settings }: Props) {
  const { item_per_row, blocks } = settings;
  const preloadClasses = `md:grid-cols-${item_per_row}`;
  const DEFAULT_IMAGE =
    'https://cdn.btdmp.com/dist/themes/3/3/images/watches.ac2e166e.svg';
  const imageURL = (url: string) =>
    helpers.parseImageUrl(url, { width: 320, height: 320 });

  return (
    <section className='container py-8 lg:py-10'>
      <h2 className='mb-4 text-center text-xl md:text-2xl lg:text-3xl'>
        {settings.heading}
      </h2>
      <div
        className={cn('grid grid-cols-2 gap-4 md:grid-cols-4', preloadClasses)}
      >
        {blocks?.map((collection: any, key: number) => (
          <Link
            href={'/collections/' + collection.url.params.slug}
            key={key}
            className='group'
          >
            <AspectRatio
              ratio={1}
              className='mb-1 cursor-pointer group-hover:opacity-80'
            >
              <Image
                src={
                  collection.image ? imageURL(collection.image) : DEFAULT_IMAGE
                }
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
