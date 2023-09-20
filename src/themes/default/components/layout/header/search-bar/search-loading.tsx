import { Skeleton } from '@/core/components/ui/skeleton';

export default function SearchLoading() {
  return (
    <ul>
      {[...Array(4)].map((_, key: number) => (
        <li key={key} className='flex items-start gap-x-3 border-b py-6'>
          <Skeleton className='aspect-square h-16 w-16 rounded-lg md:h-20 md:w-20' />
          <div className='flex-1'>
            <Skeleton className='mb-2 h-4 w-32' />
            <Skeleton className='h-4 w-16' />
          </div>
        </li>
      ))}
    </ul>
  );
}
