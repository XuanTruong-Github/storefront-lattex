'use client';
import configThemeStore from '@default/modules/config-theme/store';
import { cn } from '@/core/lib/utils';
import htmlParse from 'html-react-parser';
import moment from 'moment';

type Props = {
  className?: string;
};
export default function Freeship({ className }: Props) {
  const { isShow, content, startEstimated, endEstimated } = configThemeStore(
    (state) => {
      const settings = state.settings?.settings?.product?.setting_shipping;
      const startEstimated = () => {
        const time = settings?.time_shipping?.from || 10;
        return moment(new Date(), 'DD-MM-YYYY')
          .add(time, 'days')
          .format('MMM DD');
      };
      const endEstimated = () => {
        const time = settings?.time_shipping?.to || 20;
        return moment(new Date(), 'DD-MM-YYYY')
          .add(time, 'days')
          .format('MMM DD');
      };
      return {
        isShow: settings?.show_shipping || false,
        content:
          settings?.shipping_info?.content ||
          '<p><strong>Free shipping</strong> on <b>Order</b> over $80</p>',
        startEstimated: startEstimated(),
        endEstimated: endEstimated(),
      };
    }
  );
  if (!isShow) return <></>;
  return (
    <div
      className={cn(
        'relative border-b border-t py-3 pl-12 sm:rounded-lg sm:border md:pl-14',
        className
      )}
    >
      <i className='fal fa-truck fa-lg absolute left-3 top-5 text-destructive md:left-4 md:top-1/2 md:-translate-y-1/2'></i>
      {htmlParse(content)}
      <p className='text-sm text-gray-500'>
        Dispatched on {startEstimated} - {endEstimated}
      </p>
    </div>
  );
}
