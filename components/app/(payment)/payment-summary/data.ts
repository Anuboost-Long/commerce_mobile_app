import {
  CartItem,
  SummaryState,
} from "@/components/app/(tab)/cart/cart-content/data";

export type PaymentSellerGroup = {
  id: string;
  name: string;
  items: CartItem[];
};

export type PaymentSummaryTotals = SummaryState & {
  payableTotal: number;
  shippingBase: number;
  shippingPromotion: number;
  shippingTotal: number;
  transactionFee: number;
};

export const getPaymentSellerGroups = (items: CartItem[]) => {
  return items.reduce<PaymentSellerGroup[]>((groups, item) => {
    const group = groups.find((currentGroup) => currentGroup.id === item.sellerId);

    if (group) {
      group.items.push(item);
      return groups;
    }

    return [
      ...groups,
      {
        id: item.sellerId,
        name: item.sellerName,
        items: [item],
      },
    ];
  }, []);
};

export const getPaymentTotals = (
  summary: SummaryState
): PaymentSummaryTotals => {
  const shippingBase = 1.93;
  const hasItems = summary.itemCount > 0;
  const freeShippingApplied = hasItems && summary.subtotal >= 14;
  const shippingPromotion = freeShippingApplied ? shippingBase : 0;
  const shippingTotal = freeShippingApplied ? 0 : shippingBase;
  const transactionFee = hasItems ? 0.65 : 0;

  return {
    ...summary,
    payableTotal: summary.subtotal + shippingTotal + transactionFee,
    shippingBase,
    shippingPromotion,
    shippingTotal,
    transactionFee,
  };
};
