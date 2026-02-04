import { IconAsset } from "@/assets/icon-asset";
import { Screen } from "./screens";
import { translation } from "./translation";

export type TabItem = {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isEnabled: boolean;
  label: string;
};

export const TabItems: TabItem[] = [
  {
    id: Screen.Tab.home,
    icon: IconAsset.Home,
    isEnabled: true,
    label: translation.Tab.Home,
  },
  {
    id: Screen.Tab.categories,
    icon: IconAsset.Category,
    isEnabled: true,
    label: translation.Tab.Category,
  },
  {
    id: Screen.Tab.cart,
    icon: IconAsset.Cart,
    isEnabled: true,
    label: translation.Tab.Cart,
  },
  {
    id: Screen.Tab.account,
    icon: IconAsset.Account,
    isEnabled: true,
    label: translation.Tab.Account,
  },
];
