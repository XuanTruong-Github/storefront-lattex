'use client';
import { cn } from '@/core/lib/utils';

type Props = {
  pageData: any;
};
export default function OrderTracking({ pageData }: Props) {
  return (
    <article className='container min-h-full py-10'>
      {pageData.isShowTitle && (
        <h1 className='mb-4 lg:mb-10'>{pageData.title}</h1>
      )}
      <form></form>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12'>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.bodyHtml }}
          className={cn(
            'order-0 lg:order-1',
            '[&>p]:mb-4 [&>p]:text-base',
            '[&>a]:text-base [&>a]:font-bold [&>a]:text-[#3abff8]',
            '[&>h1]:mb-4 [&>h1]:font-medium',
            '[&>h2]:mb-4 [&>h2]:font-medium',
            '[&>h3]:mb-4 [&>h3]:font-medium',
            '[&>h4]:mb-4 [&>h4]:font-medium',
            '[&>h5]:mb-4 [&>h5]:font-medium',
            '[&>h6]:mb-4 [&>h6]:font-medium'
          )}
        ></div>
      </div>
    </article>
  );
}
