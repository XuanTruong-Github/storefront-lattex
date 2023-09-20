import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
export default function NotFound() {
  return (
    <main className='grid h-full place-items-center'>
      <div className='w-fit text-center'>
        <h1 className='mb-2 text-primary'>404 Page Not Found</h1>
        <p className='mb-8 text-gray-500'>
          The page you requested does not exist
        </p>
        <Button className='rounded' asChild>
          <Link href='/'>CONTINUE SHOPPING </Link>
        </Button>
      </div>
    </main>
  );
}
