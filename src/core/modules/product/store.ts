import { create } from 'zustand';
import type { Product } from './type';
type State = {
  product: Product | null;
};
type Mutation = {
  setProduct: (value: Product) => void;
  updateProduct: (field: string, value: any) => void;
};
const store = create<State & Mutation>()((set, get) => {
  return {
    product: null,
    setProduct: (value: Product) => set(() => ({ product: value })),
    updateProduct(field, value) {
      set((prev) => {
        const currentProduct: any = { ...prev.product };
        currentProduct[field] = value;
        return { product: currentProduct };
      });
    },
  };
});
export default store;
