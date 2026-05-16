import { IconAsset } from "@/assets/icon-asset";
import { Screen } from "@/constants/screens";

export type AccountProfile = {
  name: string;
  tier: string;
  phone: string;
  email: string;
  joined: string;
  city: string;
  initials: string;
};

export type AccountMetric = {
  label: string;
  value: string;
};

export type QuickActionItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  route: string;
};

export type ContactDetailItem = {
  label: string;
  value: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type LocationItem = {
  label: string;
  line1: string;
  line2: string;
  note: string;
  status: string;
};

export type PreferenceItem = {
  label: string;
  value: string;
};

export type ActivityItem = {
  title: string;
  subtitle: string;
};

export type MembershipData = {
  title: string;
  caption: string;
  eyebrow: string;
};

export const accountSections = {
  hero: true,
  quickActions: true,
  personalDetails: true,
  savedLocations: true,
  membership: true,
  preferences: true,
  recentActivity: true,
} as const;

export const accountProfile: AccountProfile = {
  name: "Sokha Vann",
  tier: "Gold Member",
  phone: "+855 12 456 890",
  email: "sokha.vann@shoplane.co",
  joined: "Member since 2021",
  city: "Phnom Penh, Cambodia",
  initials: "SV",
};

export const summaryMetrics: AccountMetric[] = [
  { label: "Orders", value: "28" },
  { label: "Wishlist", value: "14" },
  { label: "Saved", value: "$1.2k" },
];

export const quickActions: QuickActionItem[] = [
  {
    id: "dashboard",
    title: "Account dashboard",
    subtitle: "Membership, credits, and purchase overview",
    icon: IconAsset.Account,
    route: Screen.Account.dashboard,
  },
  {
    id: "orders",
    title: "Recent orders",
    subtitle: "Track shipments and reorder past purchases",
    icon: IconAsset.Package,
    route: Screen.Account.orders,
  },
  {
    id: "addresses",
    title: "Saved addresses",
    subtitle: "Home, office, and gift delivery locations",
    icon: IconAsset.Phone,
    route: Screen.Account.address,
  },
  {
    id: "wishlist",
    title: "Wishlist",
    subtitle: "Items waiting for restock or price drops",
    icon: IconAsset.Cart,
    route: Screen.Account.wish_list,
  },
];

export const contactDetails: ContactDetailItem[] = [
  { label: "Phone", value: accountProfile.phone, icon: IconAsset.Phone },
  { label: "Email", value: accountProfile.email, icon: IconAsset.Info },
  { label: "Primary city", value: accountProfile.city, icon: IconAsset.AboutUs },
];

export const locations: LocationItem[] = [
  {
    label: "Home",
    line1: "No. 18, Street 302, Boeung Keng Kang I",
    line2: "Phnom Penh 12302",
    note: "Preferred for evening deliveries",
    status: "Active",
  },
  {
    label: "Office",
    line1: "Canadia Tower, 315 Monivong Blvd",
    line2: "Daun Penh, Phnom Penh 12202",
    note: "Reception accepts parcels until 6 PM",
    status: "Active",
  },
];

export const membership: MembershipData = {
  eyebrow: "MEMBERSHIP",
  title: "420 reward points available",
  caption:
    "Redeem for express shipping, private sale access, or loyalty vouchers.",
};

export const paymentAndPreferences: PreferenceItem[] = [
  { label: "Default payment", value: "Visa ending in 2048" },
  { label: "Language", value: "English" },
  { label: "Notifications", value: "Order updates and flash sales" },
  { label: "Security", value: "2-step verification enabled" },
];

export const recentActivity: ActivityItem[] = [
  {
    title: "Order #EC-2048 shipped",
    subtitle: "Running shoes will arrive tomorrow",
  },
  {
    title: "Wishlist alert",
    subtitle: "Leather tote bag dropped by 15%",
  },
  {
    title: "Reward unlocked",
    subtitle: "You can redeem a free express delivery voucher",
  },
];
