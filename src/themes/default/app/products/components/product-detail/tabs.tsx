'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import type { Product } from '@/core/modules/product/type';
import configThemeStore from "@default/modules/config-theme/store"
type Props = {
  product: Product;
  className?: string;
};
export default function ProductTabs({ product, className }: Props) {
  return (
    <Tabs defaultValue='account' className={className}>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <h1>Account</h1>
      </TabsContent>
      <TabsContent value='password'>
        <h1>Password</h1>
      </TabsContent>
    </Tabs>
  );
}
