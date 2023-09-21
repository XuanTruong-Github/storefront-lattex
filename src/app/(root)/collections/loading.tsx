import config from 'config';
import DefaultTheme from '@/themes/default/app/collections/loading';

export default function Page() {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme />;
  }
}
