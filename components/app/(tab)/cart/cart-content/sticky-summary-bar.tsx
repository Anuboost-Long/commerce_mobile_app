import AppText from "@/components/common/app-text";
import { TAB_BAR_BOTTOM_OFFSET, TAB_BAR_HEIGHT } from "@/components/common/tab/tab-bar";
import { handleFormatCurrency } from "@/utils/currency-helper";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartCurrencyMode, LOYALTY_POINT_RATE } from "./data";
import { useCartPalette } from "./palette";

export const CART_SUMMARY_TAB_GAP = ms(12);
export const CART_SUMMARY_BOTTOM_OFFSET =
  TAB_BAR_BOTTOM_OFFSET + TAB_BAR_HEIGHT + CART_SUMMARY_TAB_GAP;

export default function StickySummaryBar({
  currencyMode,
  itemCount,
  onCheckout,
  savings,
  total,
}: {
  currencyMode: CartCurrencyMode;
  itemCount: number;
  onCheckout: () => void;
  savings: number;
  total: number;
}) {
  const palette = useCartPalette();
  const hasSelectedItems = itemCount > 0;
  const totalLabel =
    currencyMode === "currency"
      ? handleFormatCurrency(total)
      : `${Math.round(total * LOYALTY_POINT_RATE).toLocaleString()} pts`;

  return (
    <View style={[styles.container, { backgroundColor: palette.cardStrong, borderColor: palette.border, shadowColor: palette.shadow, bottom: CART_SUMMARY_BOTTOM_OFFSET }]}>
      <View style={styles.copyWrap}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          {totalLabel}
        </AppText>
        <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
          Saved {handleFormatCurrency(savings)} across promos
        </AppText>
      </View>
      <Pressable
        disabled={!hasSelectedItems}
        onPress={onCheckout}
        style={[
          styles.button,
          {
            backgroundColor: hasSelectedItems
              ? palette.accentStrong
              : palette.cardSoft,
          },
        ]}
      >
        <AppText font="SemiBold" fontSize="SubTitle" style={{ color: hasSelectedItems ? palette.white : palette.subtext }}>
          {hasSelectedItems ? `Checkout (${itemCount} items)` : "Select items"}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: ms(12),
    right: ms(12),
    borderRadius: ms(26),
    borderWidth: 1,
    padding: ms(12),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(12),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 10,
  },
  copyWrap: {
    flex: 1,
    gap: ms(2),
  },
  button: {
    borderRadius: ms(20),
    paddingHorizontal: ms(16),
    paddingVertical: ms(14),
  },
});
