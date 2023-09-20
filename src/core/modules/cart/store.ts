import { create } from 'zustand';
type State = {
  isOpenMicroCart: boolean;
};
type Mutation = {
  setOpenMicroCart: (bool: boolean) => void;
};
const store = create<State & Mutation>()((set) => ({
  isOpenMicroCart: false,
  setOpenMicroCart(bool) {
    set(() => ({
      isOpenMicroCart: bool,
    }));
  },
}));
export default store;
