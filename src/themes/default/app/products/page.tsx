import { notFound } from 'next/navigation';
import ProductDetail from './components/product-detail';
import Reviews from './components/reviews';
import productService from '@/core/modules/product/service';
import ClientProvider from './providers/client-provider';

type Props = {
  params: { slug: string };
};
async function getProduct(slug: string) {
  try {
    const data: any = await productService.getProduct(slug);
    if (!data) return null;
    const source = data.hits.hits[0]._source;
    return source;
  } catch (error) {
    console.log('🚀 ~ file: page.tsx:17 ~ getProduct ~ error:', error);
    return null;
  }
}
export default async function Page({ params }: Props) {
  const slug = params.slug;
  const product = await getProduct(slug);
  if (!product) notFound();
  return (
    <article id='product-page' className='container md:py-8 lg:py-10'>
      <ClientProvider product={product}>
        <ProductDetail product={product} className='-mx-4 mb-4 sm:mx-0' />
        <Reviews productID={product.id} className='mb-4' />
      </ClientProvider>
    </article>
  );
}
