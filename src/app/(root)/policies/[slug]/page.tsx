import type { Metadata } from 'next';
import helpers from '@/core/utils/helpers';
import config from 'config';
import DefaultTheme from '@default/app/policies/page';

type Props = {
  params: { slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  return {
    title: helpers.capitalize(slug.replace(/-/g, ' ')),
  };
}
export default function Page(props: Props) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme {...props} />;
  }
}
