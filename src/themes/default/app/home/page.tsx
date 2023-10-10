'use client';
import HeadImage from './components/head-image';
import CollectionList from './components/collection-list';
import ImageWithText from './components/image-with-text';
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
            return (
              <HeadImage key={key} settings={value.settings} className='mb-4' />
            );
          case 'collection_list':
            return (
              <CollectionList
                key={key}
                settings={value.settings}
                className='mb-6'
              />
            );
          case 'image_with_text':
            return (
              <ImageWithText
                key={key}
                settings={value.settings}
                className='mb-6'
              />
            );
          default:
            return;
        }
      })}
    </article>
  );
}
