import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function SaleBanner() {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.accentStrong }]}>
      <View>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.white }}>
          520 Sale
        </AppText>
        <View style={[styles.discountPill, { backgroundColor: palette.white }]}>
          <AppText
            font="SemiBold"
            fontSize="SubText"
            style={{ color: palette.accentStrong }}
          >
            Up to 15% off
          </AppText>
        </View>
      </View>
      <Feather name="gift" size={ms(38)} color={palette.white} />
      <AppText font="Bold" fontSize="Text" style={{ color: palette.white }}>
        Save big, shop now
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(18),
    paddingVertical: ms(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  discountPill: {
    alignSelf: "flex-start",
    borderRadius: ms(6),
    marginTop: ms(6),
    paddingHorizontal: ms(8),
    paddingVertical: ms(3),
  },
});
