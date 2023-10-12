'use  client';
import { useSwiper } from 'swiper/react';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';
type Props = {
  btnType?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'outlinePrimary'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'gray'
    | 'black'
    | 'success'
    | 'warning';
  btnClass?: string;
  className?: string;
};
export function PrevButton({
  btnType = 'default',
  btnClass,
  className,
}: Props) {
  const swiper = useSwiper();
  const onClick = () => swiper.slidePrev();
  return (
    <div
      className={cn('swiper-button-prev !h-fit !w-fit after:hidden', className)}
    >
      <Button
        variant={btnType}
        size='icon'
        className={btnClass}
        onClick={onClick}
      >
        <i className='fas fa-chevron-left'></i>
      </Button>
    </div>
  );
}
export function NextButton({
  btnType = 'default',
  btnClass,
  className,
}: Props) {
  const swiper = useSwiper();
  const onClick = () => swiper.slideNext();
  return (
    <div
      className={cn('swiper-button-next !h-fit !w-fit after:hidden', className)}
    >
      <Button
        variant={btnType}
        size='icon'
        className={btnClass}
        onClick={onClick}
      >
        <i className='fas fa-chevron-right'></i>
      </Button>
    </div>
  );
}
