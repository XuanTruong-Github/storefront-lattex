'use client';
import Rate from '@/core/components/global/rate';
import ReviewsLoading from './loading';
import { cn } from '@/core/lib/utils';
import productService from '@/core/modules/product/service';
import { Progress } from 'ui/progress';
import { useQuery } from '@tanstack/react-query';
type Props = {
  productID: string;
  className?: string;
};

export default function Reviews({ productID, className }: Props) {
  const getReviews = async (productID: string) => {
    try {
      const data = await productService.getReviews(productID);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const { data, isLoading }: any = useQuery({
    queryKey: ['reviews', productID],
    queryFn: () => getReviews(productID),
    enabled: !!productID,
  });
  if (isLoading) return <ReviewsLoading />;
  if (!isLoading && data) {
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
        
      </section>
    );
  }
}
