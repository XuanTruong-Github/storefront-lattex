'use client';
import HeadImage from './components/head-image';
import configThemeStore from '@default/modules/config-theme/store';

export default function Page() {
  const settings = configThemeStore(
    (state) => state?.settings?.pages?.homepage
  );
  return (
    <article id='home-page'>
      {Object.entries(settings)?.map((item) => {
        const [type, value]: any = item;
        switch (type) {
          case 'head-image':
            return <HeadImage key={type} settings={value.settings} />;
          default:
            return <div key={type}></div>;
        }
      })}
    </article>
  );
}
