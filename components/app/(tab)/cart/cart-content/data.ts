import { Screen } from "@/constants/screens";

export type CartCurrencyMode = "currency" | "points";
export const LOYALTY_POINT_RATE = 50;

export type CartItem = {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  variant: string;
  skinFocus: string;
  quantity: number;
  unitPrice: number;
  compareAtPrice: number;
  stockLeft: number;
  image: string;
  imageThumb: string;
  badge: string;
  syncState: "idle" | "pending" | "confirmed";
  isSavedForLater: boolean;
  priceChangeLabel: string;
  liveDealMinutesLeft: number;
};

export type CartSellerGroup = {
  id: string;
  name: string;
  couponHint: string;
  freeShippingThreshold: number;
  freeShippingCurrent: number;
  collapsed: boolean;
  items: CartItem[];
};

export type SummaryState = {
  subtotal: number;
  total: number;
  savings: number;
  itemCount: number;
  checkoutRoute: string;
};

export type TogetherItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
};

export const cartScope = {
  hero: true,
  recommendations: true,
  summary: true,
} as const;

const sellers = [
  {
    id: "seller-1",
    name: "Velvet Skin Lab",
    couponHint: "Spend $85 to unlock 12% clinic voucher",
    freeShippingThreshold: 160,
  },
  {
    id: "seller-2",
    name: "Rose Dew Beauty",
    couponHint: "Buy 2 masks, get mini essence free",
    freeShippingThreshold: 140,
  },
  {
    id: "seller-3",
    name: "Lumiere Facial House",
    couponHint: "Add one serum for a free rose quartz spatula",
    freeShippingThreshold: 190,
  },
  {
    id: "seller-4",
    name: "Petal Pharmacy",
    couponHint: "Stack loyalty points with weekend flash deal",
    freeShippingThreshold: 150,
  },
  {
    id: "seller-5",
    name: "Pure Bloom Derm",
    couponHint: "Sensitive-skin bundle saves 18%",
    freeShippingThreshold: 130,
  },
  {
    id: "seller-6",
    name: "Cloud Cream Collective",
    couponHint: "Members get a deluxe cream sample today",
    freeShippingThreshold: 170,
  },
];

const productTemplates = [
  "Barrier Repair Cream",
  "Peptide Glow Serum",
  "Ceramide Milk Cleanser",
  "Rosewater Toner Mist",
  "Calming Overnight Mask",
  "Daily SPF Veil",
  "Vitamin C Cloud Gel",
  "Hydra Silk Essence",
  "Collagen Eye Balm",
  "Soft Reset Peel Pads",
  "Velvet Lip Treatment",
  "Blue Chamomile Ampoule",
  "Microbiome Face Wash",
  "Bright Petal Lotion",
  "Dewy Bounce Emulsion",
  "Porcelain Clay Mask",
  "AHA Body Serum",
  "Cream Skin Refiner",
];

const variants = [
  "50 ml / Sensitive",
  "30 ml / Brightening",
  "100 ml / Daily",
  "75 ml / Night repair",
  "2-pack / Travel duo",
  "150 ml / Pump bottle",
];

const skinFocuses = [
  "Barrier support",
  "Hydration",
  "Brightening",
  "Texture care",
  "Pore refining",
  "Firming",
];

const skincareImages = [
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
];

export const frequentlyBoughtTogether: TogetherItem[] = [
  {
    id: "together-1",
    title: "Petal hydration set",
    subtitle: "Cleanser + essence + barrier cream",
    price: 48,
    image: skincareImages[0],
  },
  {
    id: "together-2",
    title: "Glow ritual trio",
    subtitle: "Vitamin C serum, SPF veil, eye balm",
    price: 62,
    image: skincareImages[1],
  },
  {
    id: "together-3",
    title: "Calm skin travel kit",
    subtitle: "Mini mist, cleanser, and sleep mask",
    price: 36,
    image: skincareImages[2],
  },
];

export const createInitialSellerGroups = (): CartSellerGroup[] => {
  return sellers.map((seller, sellerIndex) => {
    const items: CartItem[] = Array.from({ length: 18 }, (_, itemIndex) => {
      const templateIndex = (sellerIndex * 3 + itemIndex) % productTemplates.length;
      const variantIndex = itemIndex % variants.length;
      const basePrice = 18 + ((sellerIndex + itemIndex) % 8) * 6;
      const compareAtPrice = basePrice + 6 + (itemIndex % 3) * 4;
      const stockLeft = ((itemIndex + sellerIndex) % 7) + 1;
      const image = skincareImages[(sellerIndex + itemIndex) % skincareImages.length];

      return {
        id: `${seller.id}-item-${itemIndex + 1}`,
        sellerId: seller.id,
        sellerName: seller.name,
        title: productTemplates[templateIndex],
        variant: variants[variantIndex],
        skinFocus: skinFocuses[(templateIndex + itemIndex) % skinFocuses.length],
        quantity: (itemIndex % 3) + 1,
        unitPrice: basePrice,
        compareAtPrice,
        stockLeft,
        image,
        imageThumb: `${image}&w=40&q=20`,
        badge: itemIndex % 4 === 0 ? "Flash deal" : itemIndex % 5 === 0 ? "Best seller" : "Editor pick",
        syncState: "idle",
        isSavedForLater: false,
        priceChangeLabel: itemIndex % 6 === 0 ? "Price adjusted 2 mins ago" : "",
        liveDealMinutesLeft: 45 - itemIndex,
      };
    });

    const freeShippingCurrent = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    return {
      id: seller.id,
      name: seller.name,
      couponHint: seller.couponHint,
      freeShippingThreshold: seller.freeShippingThreshold,
      freeShippingCurrent,
      collapsed: false,
      items,
    };
  });
};

export const getVisibleSections = (
  groups: CartSellerGroup[],
  visibleSellerCount: number
) => {
  return groups.slice(0, visibleSellerCount).map((group) => ({
    ...group,
    data: group.collapsed ? [] : group.items,
  }));
};

export const getCartSummary = (groups: CartSellerGroup[]): SummaryState => {
  const totals = groups.flatMap((group) => group.items).reduce(
    (acc, item) => {
      const lineTotal = item.unitPrice * item.quantity;
      const compareAtLine = item.compareAtPrice * item.quantity;

      return {
        subtotal: acc.subtotal + lineTotal,
        savings: acc.savings + (compareAtLine - lineTotal),
        itemCount: acc.itemCount + item.quantity,
      };
    },
    { subtotal: 0, savings: 0, itemCount: 0 }
  );

  return {
    subtotal: totals.subtotal,
    savings: totals.savings,
    itemCount: totals.itemCount,
    total: totals.subtotal - Math.min(totals.savings * 0.15, 64) + 12,
    checkoutRoute: Screen.Payment.payment_option,
  };
};
