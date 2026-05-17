import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function ProductListToolbar() {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card }]}>
      <View style={styles.sortRow}>
        {["Best match", "Price", "Top sales", "Tmall"].map((label, index) => (
          <View key={label} style={styles.sortItem}>
            <AppText
              font={index === 0 ? "SemiBold" : "Medium"}
              fontSize="Text"
              style={{ color: index === 0 ? palette.accentStrong : palette.subtext }}
            >
              {label}
            </AppText>
            {index === 0 && (
              <Feather
                name="chevron-down"
                size={ms(14)}
                color={palette.accentStrong}
              />
            )}
            {index === 1 && (
              <MaterialCommunityIcons
                name="unfold-more-horizontal"
                size={ms(14)}
                color={palette.subtext}
              />
            )}
          </View>
        ))}
        <Feather name="grid" size={ms(20)} color={palette.subtext} />
        <Feather name="sliders" size={ms(20)} color={palette.subtext} />
      </View>
      <View style={[styles.shippingPill, { borderColor: palette.accentStrong }]}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
          Filter for{" "}
          <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
            free shipping
          </AppText>
          {" "}items
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(14),
    paddingBottom: ms(12),
    gap: ms(10),
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(10),
  },
  sortItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(3),
  },
  shippingPill: {
    borderWidth: 1,
    borderRadius: ms(999),
    height: ms(38),
    alignItems: "center",
    justifyContent: "center",
  },
});
