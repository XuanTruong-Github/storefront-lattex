import config from 'config';
import { Metadata } from 'next';
import DefaultTheme from '@/themes/default/app/checkout/page';
export const metadata: Metadata = {
  title: 'Checkout',
};
export default function Page(props: any) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme {...props} />;
  }
}
