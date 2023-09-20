import Rate from '@/core/components/global/rate';
import ReviewsList from './reviews-list';
import { cn } from '@/core/lib/utils';
import productService from '@/core/modules/product/service';
import { Progress } from '@/core/components/ui/progress';
type Props = {
  productID: string;
  className?: string;
};
async function getReviews(productID: string) {
  try {
    const data = await productService.getReviews(productID);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default async function Reviews({ productID, className }: Props) {
  const data: any = await getReviews(productID);
  if (!data) return;
  return (
    <section className={cn(className)}>
      <h3 className='mb-4 text-lg'>Customers Reviews {`(${data?.total})`}</h3>
      <div className='mb-4 grid grid-cols-2 rounded-xl bg-gray-100 p-3'>
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
      <ReviewsList initialData={data} productID={productID} className='' />
    </section>
  );
}
