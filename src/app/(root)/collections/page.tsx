import type { Metadata } from 'next';
import config from 'config';
import DefaultTheme from '@/themes/default/app/collections/page';
export const metadata: Metadata = {
  title: 'Collections',
};
export default function Page() {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme />;
  }
}
