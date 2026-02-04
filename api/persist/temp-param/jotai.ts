import { atom } from "jotai";

interface ParamAtomProp {
  path_name: string | null;
  path_param: any | null;
  current_path: string | null;
}

export const ParamAtom = atom<ParamAtomProp>({
  path_name: null,
  path_param: null,
  current_path: null,
});
