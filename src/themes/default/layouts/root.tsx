import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/core/lib/react-query/provider';
import BootstrapProvider from '@default/providers/bootstrap';
import Links from '@default/components/layout/head/links';
import Styles from '@default/components/layout/head/styles';
import '@default/assets/styles/styles.scss';

const font = Inter({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default async function DefaultThemeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
