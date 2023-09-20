import { notFound } from 'next/navigation';
import pagesService from '@/core/modules/pages/service';
import ContactUsPage from '@default/app/pages/components/contact-us';
import DynamicPage from './components/dynamic';
import OrderTrackingPage from './components/order-tracking';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  try {
    const page: any = await pagesService.getPage(params.slug);
    if (!page) notFound();
    switch (page.handle) {
      case 'contact-us':
        return <ContactUsPage pageData={page} />;
      case 'order-tracking-page':
        return <OrderTrackingPage pageData={page} />;
      default:
        return <DynamicPage pageData={page} />;
    }
  } catch (error) {
    console.log('🚀 ~ file: page.tsx:17 ~ Page ~ error:', error);
    notFound();
  }
}
