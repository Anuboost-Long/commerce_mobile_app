import AppText from "@/components/common/app-text";
import { Screen } from "@/constants/screens";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { NavigationHelper } from "@/utils/navigation-helper";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export const PAYMENT_STICKY_BAR_HEIGHT = ms(72);

export default function PaymentStickyBar({
  itemCount,
  total,
}: {
  itemCount: number;
  total: number;
}) {
  const insets = useSafeAreaInsets();
  const palette = useCartPalette();
  const hasItems = itemCount > 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
          paddingBottom: Math.max(insets.bottom, ms(10)),
        },
      ]}
    >
      <View style={styles.totalWrap}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
          Total payment:
        </AppText>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          {handleFormatCurrency(total)}
        </AppText>
      </View>
      <Pressable
        disabled={!hasItems}
        onPress={() =>
          NavigationHelper.navigate({ pathname: Screen.Payment.payment_success })
        }
        style={[
          styles.payButton,
          {
            backgroundColor: hasItems
              ? palette.accentStrong
              : palette.cardSoft,
          },
        ]}
      >
        <AppText font="Bold" fontSize="Title" style={{ color: palette.white }}>
          Pay now ({itemCount})
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    paddingHorizontal: ms(18),
    paddingTop: ms(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  totalWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    gap: ms(4),
  },
  payButton: {
    borderRadius: ms(999),
    paddingHorizontal: ms(24),
    paddingVertical: ms(12),
  },
});
