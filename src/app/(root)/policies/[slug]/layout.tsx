import type { Metadata } from 'next';
import { ReactNode } from 'react';
import helpers from '@/core/utils/helpers';

type Props = {
  params: { slug: string };
  children: ReactNode;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  return {
    title: helpers.capitalize(slug.replace(/-/g, ' ')) || 'Not found',
  };
}
export default function Layout({ children }: Props) {
  return children;
}
