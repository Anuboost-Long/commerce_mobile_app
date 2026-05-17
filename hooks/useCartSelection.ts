import {
  CartItem,
  CartSellerGroup,
  getCartSummary,
} from "@/components/app/(tab)/cart/cart-content/data";
import { atom, useAtom } from "jotai";
import { useEffect, useMemo } from "react";

const SelectedCartItemIdsAtom = atom<string[]>([]);
const SelectedCartItemsAtom = atom<CartItem[]>([]);

const getSelectedCartItems = (
  groups: CartSellerGroup[],
  selectedItemIds: string[]
) => {
  if (selectedItemIds.length === 0) {
    return [];
  }

  return groups
    .flatMap((group) => group.items)
    .filter((item) => selectedItemIds.includes(item.id));
};

const areSameCartItems = (left: CartItem[], right: CartItem[]) => {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((item, index) => {
    const nextItem = right[index];

    return (
      item.id === nextItem.id &&
      item.quantity === nextItem.quantity &&
      item.unitPrice === nextItem.unitPrice &&
      item.compareAtPrice === nextItem.compareAtPrice
    );
  });
};

export default function useCartSelection(groups: CartSellerGroup[] = []) {
  const [selectedItemIds, setSelectedItemIds] = useAtom(SelectedCartItemIdsAtom);
  const [storedSelectedItems, setStoredSelectedItems] = useAtom(
    SelectedCartItemsAtom
  );

  const selectedItemsFromGroups = useMemo(
    () => getSelectedCartItems(groups, selectedItemIds),
    [groups, selectedItemIds]
  );
  const selectedItems =
    groups.length > 0 ? selectedItemsFromGroups : storedSelectedItems;
  const summary = useMemo(
    () =>
      getCartSummary([
        {
          id: "selected-cart",
          name: "",
          couponHint: "",
          freeShippingThreshold: 0,
          freeShippingCurrent: 0,
          collapsed: false,
          items: selectedItems,
        },
      ]),
    [selectedItems]
  );

  useEffect(() => {
    if (groups.length > 0) {
      setStoredSelectedItems((prev) =>
        areSameCartItems(prev, selectedItemsFromGroups)
          ? prev
          : selectedItemsFromGroups
      );
    }
  }, [groups.length, selectedItemsFromGroups]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleGroupSelection = (group: CartSellerGroup) => {
    const itemIds = group.items.map((item) => item.id);
    const areAllSelected = itemIds.every((id) => selectedItemIds.includes(id));

    setSelectedItemIds((prev) =>
      areAllSelected
        ? prev.filter((id) => !itemIds.includes(id))
        : Array.from(new Set([...prev, ...itemIds]))
    );
  };

  const removeItemSelection = (itemId: string) => {
    setSelectedItemIds((prev) => prev.filter((id) => id !== itemId));
  };

  const clearSelection = () => {
    setSelectedItemIds([]);
    setStoredSelectedItems([]);
  };

  return {
    clearSelection,
    removeItemSelection,
    selectedItemIds,
    selectedItems,
    setSelectedItemIds,
    summary,
    toggleGroupSelection,
    toggleItemSelection,
  };
}
