import { IconAsset } from "@/assets/icon-asset";
import { Screen } from "./screens";
import { translation } from "./translation";

export type DrawerItemType = {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  isEnabled: boolean;
  navigation: string;
};

export const DrawerResource = [
  {
    id: "about_us",
    icon: IconAsset.AboutUs,
    label: translation.Drawer.AboutUs,
    isEnabled: true,
    navigation: Screen.Main.about_us,
  },
  {
    id: "blog",
    icon: IconAsset.News,
    label: translation.Drawer.Blog,
    isEnabled: true,
    navigation: Screen.Main.blog,
  },
  {
    id: "contact_us",
    icon: IconAsset.Phone,
    label: translation.Drawer.ContactUs,
    isEnabled: true,
    navigation: Screen.Main.contact_us,
  },
  {
    id: "privacy_policy",
    icon: IconAsset.Shield,
    label: translation.Drawer.PrivacyPolicy,
    isEnabled: true,
    navigation: Screen.Main.privacy_policies,
  },
  {
    id: "shipping_policy",
    icon: IconAsset.Package,
    label: translation.Drawer.ShippingPolicy,
    isEnabled: true,
    navigation: Screen.Main.shipping_policies,
  },
  {
    id: "terms_and_conditions",
    icon: IconAsset.Info,
    label: translation.Drawer.TermCondition,
    isEnabled: true,
    navigation: Screen.Main.term_conditions,
  },
  {
    id: "refund_policy",
    icon: IconAsset.Refund,
    label: translation.Drawer.RefundReturn,
    isEnabled: true,
    navigation: Screen.Main.refund_return_policies,
  },
];

export const SettingMenu = {
  id: "setting",
  icon: IconAsset.Setting,
  label: translation.Drawer.Setting,
  isEnabled: true,
  navigation: Screen.Main.setting,
};
