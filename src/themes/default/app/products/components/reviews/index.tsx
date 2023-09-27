'use client';
import ReviewsLoading from './loading';
import { Progress } from 'ui/progress';
import Rate from '@/core/components/global/rate';
import Pagination from '@/themes/default/components/global/pagination';
import ReviewPost, { type ReviewType } from './review';
import productService from '@/core/modules/product/service';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { cn } from '@/core/lib/utils';

type Props = {
  productID: string;
  className?: string;
};

export default function Reviews({ productID, className }: Props) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    length: 1,
  });
  const onChangePage = (page: number) => {
    if (page <= pagination.length) {
      setPagination((prev) => ({ ...prev, page }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const { data, isLoading }: any = useQuery({
    queryKey: ['reviews', pagination.page],
    queryFn: async () => {
      try {
        const data = await productService.getReviews(
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
  });
  if (isLoading) return <ReviewsLoading />;
  return (
    <section className={cn(className)}>
      <h3 className='mb-4 text-lg'>Customers Reviews {`(${data?.total})`}</h3>
      <div className='mb-4 grid grid-cols-2 rounded-xl bg-gray-50 p-4 md:p-6'>
        <div className='flex flex-col items-center justify-center'>
          <label className='mb-1 text-xl font-bold text-warning sm:text-3xl'>
            {data.rating}
          </label>
          <Rate value={5} className='text-sm sm:text-base' />
        </div>
        <ul className='flex flex-col items-start justify-center md:w-5/6 lg:w-3/5'>
          {data.quickReview.map(
            (item: { _id: string; count: number }, key: number) => (
              <li
                key={key}
                className='flex w-full items-center gap-x-2 whitespace-nowrap text-xs text-gray-500'
              >
                <label>{item._id}:</label>
                <Progress
                  value={item.count}
                  className='h-3 rounded-sm border bg-white [&>div]:bg-warning'
                  max={100}
                />
                <span>{item.count}%</span>
              </li>
            )
          )}
        </ul>
      </div>

      <div className='mb-6 columns-2 sm:columns-3 lg:columns-4'>
        {data.reviews.map((review: ReviewType, key: number) => (
          <ReviewPost key={key} review={review} className='mb-4' />
        ))}
      </div>
      {pagination.length > 1 && (
        <Pagination
          className='ml-auto'
          totalVisible={3}
          page={pagination.page}
          length={pagination.length}
          onChange={onChangePage}
        />
      )}
    </section>
  );
}
