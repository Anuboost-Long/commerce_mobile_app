import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function OrderAssuranceStrip() {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: "#DDF9ED" }]}>
      <View style={styles.item}>
        <Feather name="shield" size={ms(18)} color={palette.success} />
        <AppText font="SemiBold" fontSize="Text" style={{ color: palette.text }}>
          Safe payments
        </AppText>
      </View>
      <View style={[styles.divider, { backgroundColor: palette.success }]} />
      <View style={styles.item}>
        <MaterialCommunityIcons
          name="truck-delivery"
          size={ms(20)}
          color={palette.success}
        />
        <AppText font="SemiBold" fontSize="Text" style={{ color: palette.text }}>
          Delivery Guarantee
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(8),
    paddingVertical: ms(10),
    paddingHorizontal: ms(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ms(18),
    marginHorizontal: ms(14),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  divider: {
    width: 1,
    height: ms(22),
    opacity: 0.45,
  },
});
