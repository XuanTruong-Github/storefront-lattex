import config from 'config';
import DefaultThemeLayout from '@default/layouts/default';
type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultThemeLayout {...props} />;
  }
}
