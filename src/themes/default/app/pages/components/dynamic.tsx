import { cn } from '@/core/lib/utils';

type Props = {
  pageData: any;
};
export default function DynamicPage({ pageData }: Props) {
  return (
    <article className='container py-10'>
      {pageData.isShowTitle && (
        <h1 className='mb-4 text-center'>{pageData.title}</h1>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: pageData.bodyHtml }}
        className={cn(
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
    </article>
  );
}
