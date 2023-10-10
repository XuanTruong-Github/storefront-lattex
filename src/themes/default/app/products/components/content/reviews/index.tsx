'use client';
import { Progress } from 'ui/progress';
import Rate from '@/core/components/global/rate';
import Pagination from '@/themes/default/components/global/pagination';
import ReviewPost, { type ReviewType } from './review';
import productService from '@/core/modules/product/service';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { cn } from '@/core/lib/utils';

type Props = {
  productId: string;
  className?: string;
};

export default function Reviews({ productId, className }: Props) {
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
          productId,
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
    enabled: !!productId,
  });
  if (!isLoading && data.reviews.length)
    return (
      <section
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 md:border-t md:pt-4 lg:gap-14 lg:py-10 xl:gap-20',
          className
        )}
      >
        <div className='md:col-span-1'>
          <h3 className='mb-2 text-xl lg:text-2xl'>Customers Reviews </h3>
          <Rate value={5} className='mb-2 text-base' />
          <p className='mb-4 text-sm opacity-80'>
            Based on {data?.total} reviews
          </p>
          <ul className='flex flex-col items-start justify-center'>
            {data.quickReview.map(
              (item: { _id: string; count: number }, key: number) => (
                <li
                  key={key}
                  className='flex w-full items-center gap-x-3 whitespace-nowrap text-xs text-gray-500'
                >
                  <label>{item._id}:</label>
                  <Progress
                    value={item.count}
                    className='h-4 border bg-white [&>div]:bg-warning'
                    max={100}
                  />
                  <span>{item.count}%</span>
                </li>
              )
            )}
          </ul>
        </div>
        <div className='pt-2 md:col-span-2'>
          <div className='mb-6'>
            {data.reviews.map((review: ReviewType, key: number) => (
              <ReviewPost key={key} review={review} className='mb-4' />
            ))}
          </div>
          <Pagination
            className='ml-auto'
            totalVisible={3}
            page={pagination.page}
            length={pagination.length}
            onChange={onChangePage}
          />
        </div>
      </section>
    );
}
