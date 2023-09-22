import { Skeleton } from 'ui/skeleton';

export function ProductListSkeleton() {
  return (
    <ul className='mb-10 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4'>
      {[...Array(20)].map((_, index: number) => (
        <li key={index}>
          <Skeleton className='mb-4 h-48 w-full md:h-56' />
          <Skeleton className='mb-2 h-4 w-3/4' />
          <Skeleton className='h-4 w-1/4' />
        </li>
      ))}
    </ul>
  );
}
