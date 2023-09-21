'use client';
import { useQuery } from '@tanstack/react-query';
import upsellStore from '@/core/modules/upsell/store';
import useResponsive from '@/core/hooks/useResponsive';
import { cn } from '@/core/lib/utils';
type Props = {
  sku: string;
  className?: string;
};
export default function Widgets({ sku, className }: Props) {
  const { isDesktop } = useResponsive();
  const getWidgets = upsellStore((state) => state.getProductWidgets);
  useQuery({
    queryKey: ['PRODUCT-WIDGETS', sku, isDesktop],
    queryFn: () => {
      const query = {
        widgetType:
          'handpickedProduct,bestSeller,moreCollection,cartRecommend,alsoBought,recentView,pickForYou',
        showAt: 'productPage',
        handles: sku,
        device: isDesktop ? 'desktop' : 'mobile',
      };
      return getWidgets(query);
    },
    enabled: !!sku,
  });
  return (
    <div className={cn(className)}>
      <h1>Widtget</h1>
    </div>
  );
}
