import { Metadata } from 'next';
import config from 'config';
import DefaultTheme from '@default/layouts/root';
import generalService from '@/core/modules/general/service';
import '@/core/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: any = await generalService.getPreference();
    return {
      title: data.homePageTitle || config.api.url.replace('https://', ''),
      description: data.homePageDescription || '',
    };
  } catch (error) {
    return {
      title: config.api.url.replace('https://', ''),
    };
  }
}
export default function RootLayout(props: Props) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme {...props} />;
  }
}
