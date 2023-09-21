import { Skeleton } from '@/core/components/ui/skeleton';

export default function Loading() {
  return (
    <article className='container py-8'>
      <ul className='grid grid-cols-1 gap-y-6'>
        {[...Array(2)].map((_, key: number) => (
          <li key={key}>
            <div className='mb-3 flex items-center justify-between pb-1'>
              <Skeleton className='h-8 w-1/4' />
              <Skeleton className='h-5 w-8' />
            </div>
            <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
              {[...Array(4)].map((_, key: number) => (
                <li key={key}>
                  <Skeleton className='aspect-square w-full rounded-lg mb-3' />
                  <Skeleton className='h-6 w-1/3' />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </article>
  );
}
