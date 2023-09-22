import { cn } from '@/core/lib/utils';
type Props = {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  total?: number;
};
export default function Rate({ value, total = 0, className }: Props) {
  return (
    <div
      className={cn('flex w-fit items-center gap-x-[2px] text-lg', className)}
    >
      {[...Array(5)].map((_, index: number) => {
        const icon =
          index < value
            ? 'fas fa-star text-rating'
            : 'fal fa-star text-gray-500';
        return <i key={index} className={icon}></i>;
      })}
      {total > 0 && <span className='ml-[2px]'>{`(${total})`}</span>}
    </div>
  );
}
