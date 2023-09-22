'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import pagesService from '@/core/modules/pages/service';
import generalStore from '@/core/modules/general/store';
import helpers from '@/core/utils/helpers';
import { cn } from '@/core/lib/utils';
type Props = {
  params: { slug: string };
};
export default function Page({ params }: Props) {
  const { slug } = params;
  const [general] = generalStore((state) => [state.general]);
  const { data }: any = useQuery({
    queryKey: ['legal', slug],
    queryFn: () => pagesService.getLegal(slug),
  });
  const pageTitle = useMemo(
    () => helpers.capitalize(slug.replace(/-/g, ' ')),
    [slug]
  );
  const bodyHTML = useMemo(() => {
    let html = data?.content;
    if (general && html) {
      html = html.replace(/{{shop.domain}}/g, general?.domain);
      html = html.replace(/{{shop.name}}/g, general?.name || '');
      html = html.replace(/{{shop.customer_email}}/g, general?.email || '');
      html = html.replace(/{{shop.address}}/g, general?.address || '');
    }
    return html;
  }, [data, general]);
  return (
    <article className='container py-10'>
      <h1 className='mb-4 text-center'>{pageTitle}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: bodyHTML }}
        className={cn(
          'whitespace-pre-wrap ',
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
