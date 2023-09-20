import { create } from 'zustand';
import type { State, Mutation } from './type';
const store = create<State & Mutation>()((set) => ({
  loading: false,
  setLoading: (bool) =>
    set(() => ({
      loading: bool,
    })),
}));
export default store;
