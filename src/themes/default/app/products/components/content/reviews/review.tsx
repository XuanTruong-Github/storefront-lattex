import { cn } from '@/core/lib/utils';
import ReviewGallery from './gallery';
import Rate from '@/core/components/global/rate';

export type ReviewType = {
  customerEmail: string;
  customerName: string;
  images: string[];
  isPublished: number;
  quickReview: string;
  rating: number;
  review: string;
  reviewDate: string;
};
type Props = {
  review: ReviewType;
  className?: string;
};
export default function ReviewPost({ review, className }: Props) {
  const images = review.images.filter((img) => !!img);
  return (
    <article className={cn('overflow-hidden rounded-lg border', className)}>
      <ReviewGallery images={images} />
      <div className='p-3'>
        <h6 className='line-clamp-2 text-sm'>{review.customerName}</h6>
        <div className='mb-2'>
          <span className='inline-block text-xs text-gray-400'>
            {review.quickReview}
          </span>
          <Rate value={5} className='text-sm' />
        </div>
        <p className='line-clamp-6 text-sm opacity-90'>{review.review}</p>
      </div>
    </article>
  );
}
