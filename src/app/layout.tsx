import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Links from '@/core/components/head/links';
import Styles from '@default/components/layout/head/styles';
import config from 'config';
import generalService from '@/core/modules/general/service';
import ReactQueryProvider from '@/core/lib/react-query/provider';
import BootstrapProvider from '@default/providers/bootstrap';
import '@/core/styles/css/tailwind.css';
import "@/core/styles/main.scss";
type Props = {
  children: React.ReactNode;
};
const font = Inter({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});
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
export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
          crossOrigin='anonymous'
          integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
        />
        <Links />
        <Styles />
      </head>
      <body className={font.className}>
        <ReactQueryProvider>
          <BootstrapProvider>{children}</BootstrapProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
