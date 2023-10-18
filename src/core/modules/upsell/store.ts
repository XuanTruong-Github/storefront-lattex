import { create } from 'zustand';
import service from './service';
import type { State, Mutation } from './type';

const store = create<State & Mutation>()((set) => ({
  pickForYou: null,
  alsoBought: null,
  bestSeller: null,
  cartRecommend: null,
  handpickedProduct: null,
  moreCollection: null,
  recentView: null,
  async getProductWidgets(query: any) {
    try {
      const { data } = await service.getWidgets(query);
      set({
        pickForYou: data?.pickForYou || null,
        alsoBought: data?.alsoBought || null,
        bestSeller: data?.bestSeller || null,
        cartRecommend: data?.cartRecommend || null,
        handpickedProduct: data?.handpickedProduct || null,
        moreCollection: data?.moreCollection || null,
        recentView: data?.recentView || null,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
}));
export default store;
