'use client';
import HeadImage from './components/head-image';
import CollectionList from './components/collection-list';
import configThemeStore from '@default/modules/config-theme/store';

export default function Page() {
  const settings = configThemeStore(
    (state) => state?.settings?.pages?.homepage
  );
  return (
    <article id='home-page'>
      {Object.entries(settings)?.map((item) => {
        const [key, value]: any = item;
        switch (value.type) {
          case 'head-image':
            return <HeadImage key={key} settings={value.settings} />;
          case 'collection_list':
            return <CollectionList key={key} settings={value.settings} />;
          default:
            return;
        }
      })}
    </article>
  );
}
