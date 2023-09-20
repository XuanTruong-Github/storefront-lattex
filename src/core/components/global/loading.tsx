'use client';
import { useEffect } from 'react';
import uiStore from '@/core/modules/ui/store';
import { cn } from '@/core/lib/utils';
type Props = {
  className?: string;
};
export default function Loading({ className }: Props) {
  const [isShow, setLoading] = uiStore((state) => [
    state.loading,
    state.setLoading,
  ]);

  useEffect(() => {
    let id: any;
    if (isShow) {
      id = setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
    return () => {
      if (id) clearTimeout(id);
    };
  }, [isShow, setLoading]);

  if (isShow) {
    return (
      <div className='user fixed left-0 top-0 z-50 grid h-full w-full place-items-center bg-white/80'>
        <div
          role='status'
          className={cn('flex items-center gap-x-2 text-gray-500', className)}
        >
          <i className='fad fa-spinner-third animate-spin'></i>
          <span className='text-base'>Loading...</span>
        </div>
      </div>
    );
  }
}
