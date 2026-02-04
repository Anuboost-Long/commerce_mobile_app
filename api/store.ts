import { createStore } from "jotai";
export interface GenericAtomProp {
  loading: boolean;
  data?: any;
  error: string;
}
export type JotaiAtom = {
  loading: boolean;
  error: any;
  success?: boolean;
};

const store = createStore();
export default store;
