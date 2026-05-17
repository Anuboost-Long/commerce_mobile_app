import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function DeliveryAddressCard() {
  const palette = useCartPalette();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: palette.accentStrong }]}>
        <Feather name="map-pin" size={ms(18)} color={palette.white} />
      </View>
      <View style={styles.copyWrap}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          217st
        </AppText>
        <AppText
          font="Medium"
          fontSize="Text"
          numLines={1}
          style={{ color: palette.subtext }}
        >
          Ly kimlong 855-969720720
        </AppText>
      </View>
      <Feather name="chevron-right" size={ms(22)} color={palette.subtext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(12),
    paddingHorizontal: ms(18),
    paddingVertical: ms(18),
  },
  iconWrap: {
    width: ms(42),
    height: ms(42),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  copyWrap: {
    flex: 1,
    gap: ms(4),
  },
});
