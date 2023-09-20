'use client';
import configThemeStore from '@/themes/default/modules/config-theme/store';

export default function TopBar() {
  const { isShow, content } = configThemeStore((state) => {
    const settings = state.settings?.pages?.fixed?.header?.block[0];
    return {
      isShow: settings?.config[0]?.value || false,
      content: settings?.config[1]?.value || '',
    };
  });
  if (isShow && content)
    return (
      <section className='top-bar hidden md:block'>
        <div className='container line-clamp-2 py-1 text-center font-medium'>
          {content}
        </div>
      </section>
    );
}
