'use client';
import PickForYou from '@default/components/widgets/pick-for-you';
import { useQuery } from '@tanstack/react-query';
import upSellStore from '@/core/modules/upsell/store';
import useResponsive from '@/core/hooks/useResponsive';
import { cn } from '@/core/lib/utils';
type Props = {
  sku: string;
  className?: string;
};
export default function Widgets({ sku, className }: Props) {
  const { isDesktop } = useResponsive();
  const getWidgets = upSellStore((state) => state.getProductWidgets);
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
      <PickForYou />
    </div>
  );
}
