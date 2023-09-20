import Logo from '@default/components/global/logo';
import InformationForm from './components/information-form';
import OrderSummary from './components/order-summary';
export default function Page() {
  return (
    <article className='grid h-full w-full grid-cols-1 md:grid-cols-2'>
      <section className='order-last px-4 py-10 md:order-first md:overflow-y-auto'>
        <div className='mx-auto sm:max-w-lg md:ml-auto md:max-w-xl xl:ml-auto xl:mr-6'>
          <Logo className='mx-auto mb-6 hidden h-14 w-1/3 md:block' />
          <InformationForm />
        </div>
      </section>
      <section className='order-first bg-secondary px-4 py-10 md:order-last md:overflow-y-auto'>
        <div className='mx-auto sm:max-w-lg md:max-w-xl xl:ml-6 xl:mr-auto'>
          <Logo className='mx-auto mb-6 h-14 w-1/3 md:pointer-events-none md:opacity-0' />
          <OrderSummary />
        </div>
      </section>
    </article>
  );
}
