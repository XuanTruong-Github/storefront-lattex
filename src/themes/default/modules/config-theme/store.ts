import { create } from 'zustand';

import configThemeDefault from '@/configs/config-theme.json';
import service from './service';
type State = {
  settings: any;
  manifest: any;
  currency: any;
  legalBusiness: any;
};

type Action = {
  loadConfigTheme: () => any;
};
const store = create<State & Action>()((set) => ({
  settings: configThemeDefault,
  manifest: null,
  currency: null,
  legalBusiness: null,
  async loadConfigTheme() {
    try {
      const data: any = await service.getConfigTheme();
      if (data) {
        set(() => ({
          manifest: data.manifest,
          currency: data.currency,
          legalBusiness: data.legalBusiness,
          settings: data.theme[0] || configThemeDefault,
        }));
        return data;
      }
      return null;
    } catch (error) {
      console.log('🚀 ~ file: store.ts:40 ~ loadConfigTheme ~ error:', error);
      return null;
    }
  },
}));
export default store;
