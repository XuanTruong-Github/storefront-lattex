import config from 'config';
import DefaultTheme from '@default/app/products/loading';

export default function Loading() {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme />;
  }
}
