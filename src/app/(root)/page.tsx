import config from 'config';
import DefaultThemeHomePage from '@default/app/home/page';

export default function Page(props: any) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultThemeHomePage {...props} />;
  }
}
