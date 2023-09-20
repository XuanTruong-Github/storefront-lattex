import { Skeleton } from '@/core/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='container py-4 lg:py-10 xl:py-12'>
      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
        <div>
          <Skeleton className='mb-2 aspect-square w-full rounded-lg' />
          <div className='grid grid-cols-5 gap-2'>
            {[...Array(5)].map((_, key: number) => (
              <Skeleton key={key} className='aspect-square rounded-lg' />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className='mb-4 h-6 w-3/4 md:h-10' />
          <Skeleton className='mb-4 h-8 w-1/4 md:h-10' />
          <Skeleton className='mb-8 h-4 w-2/3 md:h-6' />
          <div className='mb-4 grid grid-cols-1 gap-3 md:mb-6 md:grid-cols-5 lg:w-4/5'>
            <Skeleton className='h-12 w-1/3 md:col-span-1 md:h-10 md:w-full lg:h-14' />
            <Skeleton className='h-12 md:col-span-2 md:h-10 lg:h-14' />
            <Skeleton className='h-12 md:col-span-2 md:h-10 lg:h-14' />
            <Skeleton className='h-12 md:col-span-5 md:h-10 lg:h-14' />
          </div>
          <Skeleton className='aspect-video' />
        </div>
      </section>
    </div>
  );
}
