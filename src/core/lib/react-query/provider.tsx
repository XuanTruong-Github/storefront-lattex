'use client';
import type { ReactNode } from 'react';
import {
  Hydrate,
  HydrateProps,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './query-client';
type Props = {
  children: ReactNode;
};

export function HydrateWrapper(props: HydrateProps) {
  return <Hydrate {...props} />;
}
export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
