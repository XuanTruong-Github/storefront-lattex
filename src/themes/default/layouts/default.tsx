import Header from '@default/components/layout/header';
import Footer from '@default/components/layout/footer';
import { Fragment, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <Header />
      <main className='min-h-full w-full'>{children}</main>
      <Footer />
    </Fragment>
  );
}
