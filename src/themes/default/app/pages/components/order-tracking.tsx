'use client';
import { cn } from '@/core/lib/utils';
import styles from '../styles/styles.module.scss';

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
          className={cn('order-0 lg:order-1', styles.pageBody)}
        ></div>
      </div>
    </article>
  );
}
