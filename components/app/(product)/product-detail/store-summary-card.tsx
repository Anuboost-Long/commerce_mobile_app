import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { ProductDetail } from "./data";

export default function StoreSummaryCard({ product }: { product: ProductDetail }) {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card }]}>
      <View style={styles.headerRow}>
        <View style={[styles.storeIcon, { backgroundColor: palette.accentSoft }]}>
          <MaterialCommunityIcons
            name="storefront"
            size={ms(22)}
            color={palette.accentStrong}
          />
        </View>
        <View style={styles.copyWrap}>
          <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
            {product.storeName}
          </AppText>
          <AppText
            font="Medium"
            fontSize="SubText"
            style={{ color: palette.subtext }}
          >
            Ships in 24 hours · 98% positive feedback
          </AppText>
        </View>
        <Feather name="chevron-right" size={ms(18)} color={palette.subtext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(18),
    paddingVertical: ms(14),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  storeIcon: {
    width: ms(42),
    height: ms(42),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  copyWrap: {
    flex: 1,
    gap: ms(3),
  },
});
