import Breadcrumbs, {
  type BreadcrumbItem,
} from '@/core/components/global/breadcrumbs';
import { AspectRatio } from 'ui/aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import collectionService from '@/core/modules/collection/service';
import helpers from '@/core/utils/helpers';
import type { Collection } from '@/core/modules/collection/type';

export async function getCollections(): Promise<Collection[]> {
  try {
    const { collections }: any = await collectionService.getCollections();
    return collections || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page() {
  // States
  const breadCrumbItems: BreadcrumbItem[] = [
    {
      url: '/collections',
      title: 'Collections',
      active: true,
    },
  ];

  // Methods
  const collections = await getCollections();
  return (
    <article className='container py-8'>
      <Breadcrumbs data={breadCrumbItems} className='mb-6' />
      {!collections.length && <p>The are no collections</p>}
      {collections.length > 0 && (
        <ul className='my-10 grid grid-cols-2 gap-x-4 gap-y-8 md:my-14 md:grid-cols-3 lg:my-16 lg:min-h-[680px] lg:grid-cols-4'>
          {collections.map((collection: Collection, key: number) => (
            <li key={key} className='group relative'>
              <Link
                href={'/collections/' + collection.handle}
                className='block w-full'
              >
                <AspectRatio
                  ratio={1}
                  className='mb-2 overflow-hidden rounded-lg group-hover:opacity-80'
                >
                  <Image
                    src={helpers.parseImageUrl(collection.imageSrc, {
                      width: 320,
                      height: 320,
                    })}
                    alt={collection.title}
                    className='duration-500 group-hover:scale-105'
                    sizes='(min-width: 320px) 100%'
                    fill
                  />
                </AspectRatio>

                <h3 className='mb-1 line-clamp-2 text-xs font-normal underline-offset-4 opacity-90 group-hover:text-primary group-hover:underline sm:text-sm'>
                  {collection.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
