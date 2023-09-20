import { useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';

export default function useResponsive() {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < 768, [width]);
  const isDesktop = useMemo(() => width >= 768, [width]);
  return {
    isMobile,
    isDesktop,
  };
}
