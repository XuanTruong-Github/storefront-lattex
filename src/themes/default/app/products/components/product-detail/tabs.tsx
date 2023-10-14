'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/components/ui/accordion';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
import configThemeStore from '@default/modules/config-theme/store';
import useResponsive from '@/core/hooks/useResponsive';
import htmlParse from 'html-react-parser';
type Props = {
  product: Product;
  className?: string;
  position: 'below' | 'right';
};
type TabType = {
  heading: string;
  id: string;
  type: string;
  display: string;
  content: string;
  collapse_default: boolean;
};
export default function ProductTabs({
  product,
  className,
  position = 'below',
}: Props) {
  const { isMobile, isDesktop } = useResponsive();

  const tabs = configThemeStore((state) => {
    const tabs = state.settings?.settings?.product['tabs-detail'] || [];
    const sortDescriptionFirst = (array: TabType[]) => {
      const descriptionTab = array.find(({ id }) => id === 'description');
      if (descriptionTab) {
        const result = array.filter(({ id }) => id != 'description');
        result.unshift(descriptionTab);
        return result;
      }
      return array;
    };
    return sortDescriptionFirst(tabs);
  });
  if (position === 'below' && isDesktop) {
    return (
      <Tabs defaultValue='description' className={className}>
        <TabsList className='h-fit bg-transparent border-b w-full py-0 justify-start'>
          {tabs.map((tab: TabType, key: number) => (
            <TabsTrigger
              value={tab.id}
              key={key}
              className={cn(
                'rounded-none border-b-2 leading-10 px-4 py-2 mb-[-1px]',
                'hover:text-primary border-b-transparent',
                'data-[state=active]:bg-transparent',
                'data-[state=active]:shadow-none',
                'data-[state=active]:border-b-primary',
                'data-[state=active]:border-b-2',
                'data-[state=active]:text-primary',
              )}
            >
              {tab.heading}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab: TabType, key: number) => (
          <TabsContent
            value={tab.id}
            key={key}
            className={cn(
              'px-2',
              tab.id === 'description' && 'product-description'
            )}
          >
            {htmlParse(
              tab.id === 'description' ? product.description : tab.content
            )}
          </TabsContent>
        ))}
      </Tabs>
    );
  }
  if (position === 'right' || isMobile) {
    return (
      <Accordion type='single' defaultValue={ isMobile ? 'description' : ''} collapsible className={cn('w-full', className)}>
        {tabs.map((tab: TabType, key: number) => (
          <AccordionItem
            value={tab.id}
            key={key}
            className={cn(key == tabs.length - 1 && 'border-none')}
          >
            <AccordionTrigger className='py-5 text-sm hover:no-underline [&[data-state=open]]:text-primary'>
              {tab.heading}
            </AccordionTrigger>
            <AccordionContent
              className={cn(tab.id === 'description' && 'product-description')}
            >
              {htmlParse(
                tab.id === 'description' ? product.description : tab.content
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
}
