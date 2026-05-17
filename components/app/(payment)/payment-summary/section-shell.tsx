import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function SectionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(18),
    paddingVertical: ms(16),
    gap: ms(14),
  },
});
