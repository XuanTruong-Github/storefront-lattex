import { create } from 'zustand';
import service from './service';
import type { State, Mutation } from './type';

const store = create<State & Mutation>()(() => ({
  async getProductWidgets(query: any) {
    try {
      const data = await service.getWidgets(query);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
}));
export default store;
