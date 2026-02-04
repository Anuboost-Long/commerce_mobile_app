import store from "@/api/store";
import { ParamAtom } from "./jotai";

export const handleSaveTemporaryBackRoute = (pathName: string, param: any) => {
  store.set(ParamAtom, (prev) => ({
    ...prev,
    path_name: pathName,
    path_param: param,
  }));
};

export const handleSetCurrentPath = (currentPath: string) => {
  store.set(ParamAtom, (prev) => ({
    ...prev,
    current_path: currentPath,
  }));
};

export const handleClearTemporaryBackRoute = () => {
  store.set(ParamAtom, (prev) => ({
    ...prev,
    path_name: null,
    path_param: null,
  }));
};
