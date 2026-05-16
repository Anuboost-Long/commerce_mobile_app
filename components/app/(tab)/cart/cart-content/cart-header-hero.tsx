import AppText from "@/components/common/app-text";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { getCartPalette } from "./palette";

export default function CartHeaderHero({ itemCount }: { itemCount: number }) {
  const palette = getCartPalette(false);

  return (
    <BlurView intensity={40} style={[styles.container, { borderColor: palette.border }]}>
      <View style={[styles.glowOne, { backgroundColor: palette.accentSoft }]} />
      <View style={[styles.glowTwo, { backgroundColor: "rgba(217, 198, 255, 0.35)" }]} />
      <AppText font="SemiBold" fontSize="SubText" style={[styles.eyebrow, { color: palette.accentStrong }]}>
        YOUR RITUAL CART
      </AppText>
      <AppText font="Bold" fontSize="HeroText" style={[styles.title, { color: palette.text }]}>
        Soft clinical beauty, ready to check out.
      </AppText>
      <AppText font="Medium" fontSize="Text" style={[styles.caption, { color: palette.subtext }]}>
        Built for large baskets, live pricing, variant-heavy skincare, and frictionless mobile editing.
      </AppText>
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: palette.cardSoft, borderColor: palette.border }]}>
          <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
            {itemCount}
          </AppText>
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
            Items in cart
          </AppText>
        </View>
        <View style={[styles.metricCard, { backgroundColor: palette.cardSoft, borderColor: palette.border }]}>
          <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
            Live
          </AppText>
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
            Stock + price sync
          </AppText>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: ms(30),
    borderWidth: 1,
    padding: ms(18),
    gap: ms(12),
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  glowOne: {
    position: "absolute",
    width: ms(180),
    height: ms(180),
    borderRadius: ms(180),
    top: ms(-70),
    right: ms(-40),
  },
  glowTwo: {
    position: "absolute",
    width: ms(120),
    height: ms(120),
    borderRadius: ms(120),
    bottom: ms(-30),
    left: ms(-20),
  },
  eyebrow: {
    letterSpacing: 1.2,
  },
  title: {
    lineHeight: ms(30),
  },
  caption: {
    lineHeight: ms(18),
  },
  metricsRow: {
    flexDirection: "row",
    gap: ms(10),
  },
  metricCard: {
    flex: 1,
    borderRadius: ms(20),
    borderWidth: 1,
    padding: ms(12),
    gap: ms(4),
  },
});
