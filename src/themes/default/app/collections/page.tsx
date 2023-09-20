import Breadcrumbs, {
  type BreadcrumbItem,
} from '@/core/components/global/breadcrumbs';
import CollectionsList from './components/collections-list';
import { getCollections } from './services/service';

export default async function Page() {
  // States
  const breadCrumbItems: BreadcrumbItem[] = [
    {
      url: '/collections',
      title: 'Collections',
      active: true,
    },
  ];
  // Methods
  const collections = await getCollections();
  return (
    <article className='container py-8'>
      <Breadcrumbs data={breadCrumbItems} className='mb-6' />
      <CollectionsList collections={collections} />
    </article>
  );
}
