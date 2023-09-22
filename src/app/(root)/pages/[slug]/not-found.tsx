import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
export default function NotFound() {
  return (
    <section className='flex h-[80vh] flex-col items-center justify-center'>
      <h1 className='mb-2'>404</h1>
      <p className='mb-4'>The page you requested was not found.</p>
      <Button variant='outline' asChild>
        <Link href='/'>Continue Shopping</Link>
      </Button>
    </section>
  );
}
