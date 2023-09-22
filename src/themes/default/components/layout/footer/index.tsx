'use client';
import Image from 'next/image';
import Logo from './logo';
import { cn } from '@/core/lib/utils';
import Link from 'next/link';
import BackToTop from '@/core/components/global/back-to-top';
import configThemeStore from '@/themes/default/modules/config-theme/store';
import navigationStore from '@/core/modules/navigation/store';
import helpers from '@/core/utils/helpers';

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  const settings = configThemeStore((state) => {
    const configs = state.settings?.pages?.fixed?.footer;
    return {
      info: {
        address: {
          label: configs?.block[0]?.config[0]?.label || 'Address',
          value:
            configs?.block[0]?.config[0]?.value
              ?.split('\n')
              ?.filter((item: string) => item?.length) || [],
        },
        email: {
          label: configs?.block[0]?.config[1]?.label || 'Email:',
          value: configs?.block[0]?.config[1]?.value || '',
        },
        copyRight: configs?.block[0]?.config[2]?.value?.split('\n') || [],
      },
      payments:
        configs?.block[2]?.config?.map((item: any) => item?.value) || [],
    };
  });
  const menu = navigationStore((state) => state.footerMenu.items);
  //! This variable is used to preload tailwind classes
  const preloadGridClass = 'md:grid-cols-3 md:grid-cols-4 md:grid-cols-5';
  return (
    <footer
      id='footer'
      className={cn(
        'footer w-full border-t bg-secondary pb-6 pt-10',
        className
      )}
    >
      <section
        className={cn(
          'container mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2',
          `md:grid-cols-${menu.length + 1}`
        )}
      >
        <div className='text-sm'>
          <Logo />
          <div className='my-2 flex items-center gap-x-1'>
            <label className='mr-1 font-medium'>
              {settings.info.address.label}:
            </label>
            <ul className='max-w-full'>
              {settings.info.address.value.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>
          <div className='mb-2 flex items-center gap-x-1'>
            <label className='font-medium'>{settings.info.email.label}:</label>
            <a
              href={`mailto:${settings.info.email.value}`}
              className='hover:underline'
            >
              {settings.info.email.value}
            </a>
          </div>
        </div>
        {menu.map((item: any, index: number) => (
          <div key={index} className='md:flex md:justify-center'>
            <div className='md:w-fit'>
              <h5 className='mb-5'>{item.name}</h5>
              <ul className='grid grid-cols-1 gap-y-4 text-sm text-foreground'>
                {item.children.map((subItem: any, subIndex: number) => (
                  <li key={subIndex}>
                    <Link
                      href={subItem.link}
                      className='opacity-80 hover:underline'
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
      <section className='container flex flex-col items-center justify-center gap-3 border-t pt-6 sm:flex-row sm:justify-between'>
        <ul className='sm:order-0 order-1 text-xs'>
          {settings.info.copyRight.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className='order-0 flex items-center gap-2 sm:order-1'>
          {settings.payments.map((item: string, index: number) => (
            <li key={index} className='relative h-5 w-8'>
              <Image
                src={helpers.parseImageUrl(item, { width: 30, height: 20 })}
                alt=''
                sizes='(min-width: 320px) 30px'
                fill
              />
            </li>
          ))}
        </ul>
      </section>
      <BackToTop />
    </footer>
  );
}
