import Logo from '@default/components/global/logo';
import OrderSummary from '@/core/components/order/order-summary';
import orderService from '@/core/modules/order/service';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { key?: string };
};
async function getOrder(orderId: string, key: string) {
  try {
    const params = {
      orderId,
      key,
      isFinal: true,
    };
    const { status, data } = await orderService.getOrderInfo(params);
    if (status === 200) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log('🚀 ~ file: page.tsx:9 ~ getOrder ~ error:', error);
    return null;
  }
}
export async function generateMetadata({ params, searchParams }: Props) {
  const data = await getOrder(params.id, (searchParams.key = 'n0Th1nG1s43v3R'));
  if (!data) {
    notFound();
  }
  return {
    title: data?.order?.orderName,
  };
}
export default async function Page({ params, searchParams }: Props) {
  const { key = 'n0Th1nG1s43v3R' } = searchParams;
  const { order, info, customer } = await getOrder(params.id, key);
  return (
    <main className='grid h-full grid-cols-1 md:grid-cols-3'>
      <section className='no-scrollbar hidden lg:overflow-y-auto'></section>
      <section className='no-scrollbar bg-secondary p-4 lg:overflow-y-auto'>
        <Logo className='mx-auto mb-4 h-14 w-52' />
        <OrderSummary className='mb-10' info={info} />
        <div className='flex items-center gap-2'>
          <div>
            <i className='fal fa-box-check text-3xl'></i>
          </div>
          <div className='flex-1'>
            <p className='text-sm'>Order {info.orderName}</p>
            <h1 className='text-2xl'>Thank you!</h1>
          </div>
        </div>
      </section>
    </main>
  );
}
