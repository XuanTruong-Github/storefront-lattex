import config from 'config';
import DefaultTheme from '@default/layouts/not-found';
export default function NotFound() {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme />;
  }
}
