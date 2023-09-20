import { Skeleton } from '@/core/components/ui/skeleton';
export default function Loading() {
  return (
    <section className='container py-8'>
      <div className='mb-6 flex items-center gap-4'>
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-5 w-16' />
      </div>
      <div className='mb-6'>
        <Skeleton className='h-4 w-1/4' />
      </div>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4'>
        {[...Array(20)].map((_, index: number) => (
          <li key={index}>
            <Skeleton className='mb-4 h-48 w-full md:h-56' />
            <Skeleton className='mb-2 h-4 w-3/4' />
            <Skeleton className='h-4 w-1/4' />
          </li>
        ))}
      </ul>
    </section>
  );
}
