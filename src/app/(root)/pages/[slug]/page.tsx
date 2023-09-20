import config from 'config';
import type { Metadata } from 'next';
import pagesService from '@/core/modules/pages/service';
import DefaultTheme from '@default/app/pages/page';
type Props = {
  params: { slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const page: any = await pagesService.getPage(params.slug);
    return {
      title: page?.searchEngineTitle || 'Page Not Found',
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
    };
  }
}

export default async function Page(props: Props) {
  const theme = config.theme;
  switch (theme) {
    default:
      return <DefaultTheme {...props} />;
  }
}
