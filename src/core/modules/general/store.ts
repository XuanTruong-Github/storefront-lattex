import { create } from 'zustand';
import service from './service';
import type { Preference, State, Action } from './type';

const store = create<State & Action>()((set) => ({
  general: null,
  preference: null,
  async loadGeneral() {
    try {
      const data = await service.getGeneral();
      if (data) {
        set(() => ({ general: data }));
        return data;
      } else return null;
    } catch (error) {
      console.log('🚀 ~ file: store.ts:18 ~ loadGeneral ~ error:', error);
      return Promise.reject(null);
    }
  },
  async loadPreference() {
    try {
      const data: any = await service.getPreference();
      if (data) {
        set(() => ({ preference: data }));
        return data;
      } else return null;
    } catch (error) {
      console.log('🚀 ~ file: store.ts:18 ~ loadGeneral ~ error:', error);
      return Promise.reject(null);
    }
  },
}));
export default store;
