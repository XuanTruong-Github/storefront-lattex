import { Skeleton } from 'ui/skeleton';

export default function ReviewsLoading() {
  return (
    <ul className='columns-2 sm:columns-3 md:columns-4 lg:columns-5'>
      {[...Array(4)].map((_, key: number) => (
        <li key={key} className='mb-4'>
          <Skeleton className='mb-2 aspect-square w-full' />
          <Skeleton className='mb-2 h-3 w-1/2' />
          <Skeleton className='mb-1 h-2 w-full' />
          <Skeleton className='mb-1 h-2 w-full' />
          <Skeleton className='h-2 w-1/2' />
        </li>
      ))}
    </ul>
  );
}
