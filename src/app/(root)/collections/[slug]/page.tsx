import config from 'config';
import { notFound } from 'next/navigation';
import DefaultTheme from '@default/app/collections/collection/page';
import collectionService from '@/core/modules/collection/service';

type Props = {
  searchParams: { page?: number; limit?: number; sort?: string };
  params: { slug: string };
};

async function getCollection(slug: string) {
  try {
    const { collection }: any = await collectionService.getCollection(slug);
    return collection || null;
  } catch (error) {
    console.log('🚀 ~ file: page.tsx:16 ~ getCollection ~ error:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const collection = await getCollection(params.slug);
  return {
    title: collection?.title || 'Not Found',
  };
}
export default async function Page(props: Props) {
  const theme = config.theme;
  const collection = await getCollection(props.params.slug);
  if (!collection) return notFound();
  switch (theme) {
    default:
      return <DefaultTheme {...props} collection={collection} />;
  }
}
