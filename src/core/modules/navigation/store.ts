import { create } from 'zustand';
import defaultMenu from '@/configs/default-menu.json';
import service from './service';
import type { State, Action } from './type';
const store = create<State & Action>()((set) => {
  return {
    headerMenu: defaultMenu.header,
    footerMenu: defaultMenu.footer,
    async getHeaderMenu(id: string | null) {
      if (!id) return null;
      try {
        const data = await service.loadMenu(id);
        if (data) {
          set(() => ({ headerMenu: data }));
        }
        return data;
      } catch (error) {
        return null;
      }
    },
    async getFooterMenu(id: string | null) {
      if (!id) return null;
      try {
        const data = await service.loadMenu(id);
        if (data) {
          set(() => ({ footerMenu: data }));
        }
        return data;
      } catch (error) {
        return null;
      }
    },
  };
});
export default store;
