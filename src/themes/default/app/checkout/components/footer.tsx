import { Separator } from 'ui/separator';
import { cn } from '@/core/lib/utils';
import Link from 'next/link';

type Props = {
  className?: string;
};
type Navigation = {
  title: string;
  url: string;
};
export default function Footer({ className }: Props) {
  const navigations: Navigation[] = [
    {
      title: 'REFUND POLICY',
      url: '/policies/refund-policy',
    },
    {
      title: 'PRIVACY POLICY',
      url: '/policies/privacy-policy',
    },
    {
      title: 'TERMS OF SERVICES',
      url: '/policies/terms-of-services',
    },
    {
      title: 'SHIPPING POLICY',
      url: '/policies/shipping-policy',
    },
  ];
  return (
    <footer className={cn(className)}>
      <Separator className='mb-3' />
      <nav className='flex items-center gap-3 flex-wrap mb-2 text-xs'>
        {navigations.map((navigation: Navigation, key: number) => (
          <Link href={navigation.url} key={key} className='underline underline-offset-2 hover:text-primary'>
            {navigation.title}
          </Link>
        ))}
      </nav>
      <p className='text-xs'>
        I consent to receive recurring automated marketing by text message
        through an automatic telephone dialing system. Consent is not a
        condition to purchase. STOP to cancel, HELP for help. Message and Data
        rates apply.
      </p>
    </footer>
  );
}
