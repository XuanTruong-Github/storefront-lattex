'use client';
import Rate from '@/core/components/global/rate';
import { Skeleton } from '@/core/components/ui/skeleton';
import ReviewGallery from './gallery';
import Pagination from '@/themes/default/components/global/pagination';
import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import productService from '@/core/modules/product/service';
import { cn } from '@/core/lib/utils';

export type Review = {
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
  initialData: any;
  productID: string;
  className?: string;
};

function ReviewsLoading() {
  return (
    <ul className='columns-2 sm:columns-3 md:columns-4 lg:columns-5'>
      {[...Array(8)].map((_, key: number) => (
        <li key={key} className='mb-4'>
          <Skeleton className='mb-2 aspect-square w-full' />
          <Skeleton className='mb-2 h-3 w-1/2' />
          <Skeleton className='mb-1 h-2 w-full' />
          <Skeleton className='mb-1 h-2 w-full' />
          <Skeleton className='h-2 w-1/2' />
        </li>
      ))}
    </ul>
  );
}
export default function ReviewsList({
  productID,
  initialData,
  className,
}: Props) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    length: 1,
  });
  const onChangePage = (page: number) => {
    if (page <= pagination.length) setPagination((prev) => ({ ...prev, page }));
  };
  const { data, isLoading }: any = useQuery({
    queryKey: ['reviews', pagination.page],
    queryFn: async () => {
      try {
        const data: any = await productService.getReviews(
          productID,
          pagination.page,
          pagination.limit
        );
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    onSuccess({ total }: { total: number }) {
      if (total) {
        setPagination((prev) => ({
          ...prev,
          length: Math.ceil(total / prev.limit),
        }));
      }
    },
    enabled: !!productID,
    initialData,
  });
  return (
    <Fragment>
      {isLoading && <ReviewsLoading />}
      {!isLoading && data?.reviews?.length && (
        <Fragment>
          <div
            className={cn(
              'mb-6 columns-2 sm:columns-3 md:columns-4',
              className
            )}
          >
            {data.reviews.map((review: Review, key: number) => {
              const images = review.images.filter((img) => !!img);
              return (
                <article
                  key={key}
                  className='mb-4 overflow-hidden rounded-lg border'
                >
                  <ReviewGallery images={images} />
                  <div className='p-3'>
                    <h6 className='line-clamp-2 text-sm'>
                      {review.customerName}
                    </h6>
                    <div className='mb-2'>
                      <span className='inline-block text-xs text-gray-400'>
                        {review.quickReview}
                      </span>
                      <Rate value={5} className='text-sm' />
                    </div>
                    <p className='line-clamp-6 text-sm opacity-90'>
                      {review.review}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          {pagination.length > 1 && (
            <Pagination
              className='ml-auto md:mx-auto'
              totalVisible={5}
              page={pagination.page}
              length={pagination.length}
              onChange={onChangePage}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
