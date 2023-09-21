'use client';
import configThemeStore from '@/themes/default/modules/config-theme/store';

export default function TopBar() {
  const { isShow, content } = configThemeStore((state) => {
    const settings = state.settings?.pages?.fixed?.header?.settings;
    return {
      isShow: settings?.show_announcement_bar || false,
      content: 'Top bar message',
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
  else return <></>;
}
