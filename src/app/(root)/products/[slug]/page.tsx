import config from 'config';
import DefaultTheme from '@default/app/products/page';

type Props = {
  params: { slug: string };
};
export default function Page(props: Props) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme {...props} />;
  }
}
