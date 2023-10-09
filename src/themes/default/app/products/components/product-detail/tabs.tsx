'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import { cn } from '@/core/lib/utils';
import type { Product } from '@/core/modules/product/type';
import configThemeStore from '@default/modules/config-theme/store';
import htmlParse from 'html-react-parser';
type Props = {
  product: Product;
  className?: string;
};
type TabType = {
  heading: string;
  id: string;
  type: string;
  display: string;
  content: string;
  collapse_default: boolean;
};
export default function ProductTabs({ product, className }: Props) {
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

  console.log(tabs);
  return (
    <Tabs defaultValue='description' className={className}>
      <TabsList className='grid h-fit auto-cols-fr grid-flow-col bg-transparent'>
        {tabs.map((tab: TabType, key: number) => (
          <TabsTrigger
            value={tab.id}
            key={key}
            className={cn(
              'rounded-none leading-8',
              'data-[state=active]:bg-transparent',
              'data-[state=active]:shadow-none',
              'data-[state=active]:border-b',
              'data-[state=active]:border-b-primary',
              'data-[state=active]:text-primary'
            )}
          >
            {tab.heading}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab: TabType, key: number) => (
        <TabsContent value={tab.id} key={key}>
          {htmlParse(
            tab.id === 'description' ? product.description : tab.content
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
