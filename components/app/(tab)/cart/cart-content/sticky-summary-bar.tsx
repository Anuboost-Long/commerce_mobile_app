import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartCurrencyMode, LOYALTY_POINT_RATE } from "./data";
import { getCartPalette } from "./palette";

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
  const palette = getCartPalette(false);
  const totalLabel =
    currencyMode === "currency"
      ? handleFormatCurrency(total)
      : `${Math.round(total * LOYALTY_POINT_RATE).toLocaleString()} pts`;

  return (
    <View style={[styles.container, { backgroundColor: palette.cardStrong, borderColor: palette.border, shadowColor: palette.shadow }]}>
      <View style={styles.copyWrap}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          {totalLabel}
        </AppText>
        <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
          Saved {handleFormatCurrency(savings)} across promos
        </AppText>
      </View>
      <Pressable onPress={onCheckout} style={[styles.button, { backgroundColor: palette.accentStrong }]}>
        <AppText font="SemiBold" fontSize="SubTitle" style={{ color: palette.white }}>
          Checkout ({itemCount} items)
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
    bottom: ms(14),
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
