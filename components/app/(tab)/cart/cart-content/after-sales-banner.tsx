import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "./palette";

export default function AfterSalesBanner() {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: palette.accentSoft }]}>
        <Feather name="rotate-ccw" size={ms(18)} color={palette.accentStrong} />
      </View>
      <View style={styles.copyWrap}>
        <AppText font="SemiBold" fontSize="Text" style={{ color: palette.text }}>
          Free returns within 30 days
        </AppText>
        <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
          Dermatology-grade support, exchange-friendly returns, and after-sales care included.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(24),
    borderWidth: 1,
    padding: ms(14),
    flexDirection: "row",
    gap: ms(10),
  },
  iconWrap: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(16),
    alignItems: "center",
    justifyContent: "center",
  },
  copyWrap: {
    flex: 1,
    gap: ms(2),
  },
});
