import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartCurrencyMode, LOYALTY_POINT_RATE } from "./data";
import { getCartPalette } from "./palette";

export default function CartPromoRewardsStrip({
  currencyMode,
  freeGiftRemaining,
  savings,
}: {
  currencyMode: CartCurrencyMode;
  freeGiftRemaining: number;
  savings: number;
}) {
  const palette = getCartPalette(false);

  const cards = [
    {
      title: "Voucher applied",
      value: handleFormatCurrency(savings * 0.32),
      caption: "Clinic member stack",
    },
    {
      title: "Loyalty mode",
      value:
        currencyMode === "currency"
          ? `${Math.round(savings * LOYALTY_POINT_RATE)} pts`
          : handleFormatCurrency(savings),
      caption: "Toggle points anytime",
    },
    {
      title: "Free gift nudge",
      value:
        freeGiftRemaining > 0
          ? `${handleFormatCurrency(freeGiftRemaining)} more`
          : "Unlocked",
      caption: "Rose quartz spatula",
    },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
      {cards.map((card) => (
        <View
          key={card.title}
          style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}
        >
          <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.subtext }}>
            {card.title}
          </AppText>
          <AppText font="Bold" fontSize="SubTitle" style={{ color: palette.text }}>
            {card.value}
          </AppText>
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.accentStrong }}>
            {card.caption}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: ms(10),
  },
  card: {
    width: ms(158),
    borderRadius: ms(22),
    borderWidth: 1,
    padding: ms(12),
    gap: ms(4),
  },
});
