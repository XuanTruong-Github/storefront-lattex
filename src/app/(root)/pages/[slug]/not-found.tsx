import config from 'config';
import type { Metadata } from 'next';
import DefaultTheme from '@default/app/pages/not-found';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme />;
  }
}
