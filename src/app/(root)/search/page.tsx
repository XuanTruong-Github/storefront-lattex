import config from 'config';
import DefaultTheme from '@/themes/default/app/search/page';
import type { Metadata } from 'next';
type Props = {
  searchParams: { q: string; page?: number; limit?: number };
};
export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: searchParams.q,
  };
}
export default function Page(props: Props) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme {...props} />;
  }
}
