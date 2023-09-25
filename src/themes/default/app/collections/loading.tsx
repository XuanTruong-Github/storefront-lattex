import { Skeleton } from 'ui/skeleton';

export default function Loading() {
  return (
    <article className='container py-8'>
      <ul className='my-10 grid grid-cols-2 gap-x-4 gap-y-8 md:my-14 md:grid-cols-3 lg:my-16 lg:min-h-[680px] lg:grid-cols-4'>
        {[...Array(16)].map((_, key: number) => (
          <li key={key}>
            <Skeleton className='mb-3 aspect-square w-full rounded-lg' />
            <Skeleton className='h-6 w-1/3' />
          </li>
        ))}
      </ul>
    </article>
  );
}
