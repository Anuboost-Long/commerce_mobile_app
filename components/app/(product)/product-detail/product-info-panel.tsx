import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { ProductDetail } from "./data";

export default function ProductInfoPanel({
  product,
}: {
  product: ProductDetail;
}) {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card }]}>
      <AppText
        font="Bold"
        fontSize="Title"
        style={[styles.title, { color: palette.text }]}
      >
        {product.subtitle}
      </AppText>
      <View style={styles.statsRow}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
          {product.soldLabel}
        </AppText>
        <View style={[styles.dot, { backgroundColor: palette.border }]} />
        <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
          {product.cartLabel}
        </AppText>
      </View>
      <View style={[styles.serviceCard, { backgroundColor: palette.accentSoft }]}>
        <MaterialCommunityIcons
          name="truck-check"
          size={ms(20)}
          color={palette.accentStrong}
        />
        <View style={styles.serviceCopy}>
          <AppText
            font="Bold"
            fontSize="Text"
            style={{ color: palette.accentStrong }}
          >
            Free shipping over $14.00
          </AppText>
          <AppText
            font="Medium"
            fontSize="SubText"
            style={{ color: palette.subtext }}
          >
            Local returns and delivery guarantee included.
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
    paddingVertical: ms(16),
    gap: ms(12),
  },
  title: {
    lineHeight: ms(26),
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  dot: {
    width: ms(4),
    height: ms(4),
    borderRadius: ms(999),
  },
  serviceCard: {
    borderRadius: ms(12),
    padding: ms(12),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  serviceCopy: {
    flex: 1,
    gap: ms(3),
  },
});
