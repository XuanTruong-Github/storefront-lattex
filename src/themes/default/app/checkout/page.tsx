import Logo from '@default/components/global/logo';
import InformationForm from './components/information-form';
import OrderSummary from './components/order-summary';
import Shipping from './components/shipping';
import Payment from './components/payment';
import Footer from './components/footer';
export default function Page() {
  return (
    <article className='grid h-full w-full grid-cols-1 lg:grid-cols-2'>
      <section className='no-scrollbar order-last px-4 py-6 sm:py-10 lg:order-first lg:overflow-y-auto'>
        <div className='mx-auto sm:max-w-lg md:ml-auto md:max-w-xl xl:ml-auto xl:mr-6'>
          <Logo className='mx-auto mb-6 hidden h-14 w-1/3 lg:block' />
          <InformationForm />
          <Shipping className='mb-4' />
          <Payment className='mb-4'/>
          <Footer />
        </div>
      </section>
      <section className='no-scrollbar order-first bg-secondary px-4 py-6 sm:py-10 lg:order-last lg:overflow-y-auto'>
        <div className='mx-auto sm:max-w-lg md:max-w-xl xl:ml-6 xl:mr-auto'>
          <Logo className='mx-auto mb-6 h-14 w-1/3 md:pointer-events-none lg:opacity-0' />
          <OrderSummary />
        </div>
      </section>
    </article>
  );
}
