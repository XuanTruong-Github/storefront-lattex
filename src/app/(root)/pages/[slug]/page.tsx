import { notFound } from 'next/navigation';
import ContactUsPage from '@/core/components/pages/contact-us';
import DynamicPage from '@/core/components/pages/dynamic';
import OrderTrackingPage from '@/core/components/pages/order-tracking';
import type { Metadata } from 'next';
import pagesService from '@/core/modules/pages/service';
type Props = {
  params: { slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await pagesService.getPage(params.slug);
    return {
      title: data?.searchEngineTitle || 'Page Not Found',
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
    };
  }
}

export default async function Page({ params }: Props) {
  try {
    const { data } = await pagesService.getPage(params.slug);
    if (!data) notFound();
    switch (data.handle) {
      case 'contact-us':
        return <ContactUsPage pageData={data} />;
      case 'order-tracking-page':
        return <OrderTrackingPage pageData={data} />;
      default:
        return <DynamicPage pageData={data} />;
    }
  } catch (error) {
    console.log('🚀 ~ file: page.tsx:17 ~ Page ~ error:', error);
    notFound();
  }
}
