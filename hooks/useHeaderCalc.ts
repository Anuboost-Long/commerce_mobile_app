import { StorageKey } from "@/constants/storage-key";
import { StorageUtil } from "@/utils/storage-helper";
import { atom, useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type HeaderProp = {
  home_header: number;
  tab_header: number;
};

export const HeaderAtom = atom<HeaderProp>({ home_header: 0, tab_header: 0 });

export default function useHeaderCalc() {
  const inset = useSafeAreaInsets();
  const [{ home_header, tab_header }, setAtom] = useAtom(HeaderAtom);

  const handleSetHeight = ({
    key,
    value,
  }: {
    key: keyof HeaderProp;
    value: number;
  }) => {
    setAtom((prev) => ({
      ...prev,
      [key]: value,
    }));
    StorageUtil.setData({
      key: StorageKey.HeaderHeight,
      value: JSON.stringify({ home_header, tab_header, [key]: value }),
    });
  };

  const handleGetHeight = async () => {
    const data = await StorageUtil.getData(StorageKey.HeaderHeight);
    if (data) {
      setAtom(JSON.parse(data));
    }
  };

  return { home_header, tab_header, inset, handleSetHeight, handleGetHeight };
}
