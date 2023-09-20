import { Fragment } from 'react';
import { cn } from '@/core/lib/utils';
import Link from 'next/link';
export type BreadcrumbItem = { title: string; url: string; active: boolean };
type Props = {
  className?: string;
  data: BreadcrumbItem[];
};
export default function Breadcrumbs({ data, className }: Props) {
  return (
    <nav
      className={cn(
        'flex w-fit items-center space-x-2 text-sm font-medium md:space-x-3',
        className
      )}
    >
      <Link
        href='/'
        className='hover:text-info inline-flex items-center gap-x-1'
      >
        <i className='far fa-home'></i>
        Home
      </Link>
      {data.map((item: BreadcrumbItem, index: number) => (
        <Fragment key={index}>
          <i className='fas fa-chevron-right text-gray-400'></i>
          <Link
            href={item.url}
            className={cn('hover:text-info line-clamp-1', {
              'text-primary': item.active,
            })}
          >
            {item.title}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
