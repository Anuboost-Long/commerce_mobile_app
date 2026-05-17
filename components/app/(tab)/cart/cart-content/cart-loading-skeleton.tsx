import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "./palette";

export default function CartLoadingSkeleton({
  topOffset,
}: {
  topOffset: number;
}) {
  const palette = useCartPalette();

  return (
    <View style={[styles.screen, { backgroundColor: palette.screen, paddingTop: topOffset }]}>
      <View style={[styles.hero, { backgroundColor: palette.cardSoft, borderColor: palette.border }]} />
      <View style={styles.stack}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.row,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={[styles.thumb, { backgroundColor: palette.accentSoft }]} />
            <View style={styles.copy}>
              <View style={[styles.lineLg, { backgroundColor: palette.cardSoft }]} />
              <View style={[styles.lineMd, { backgroundColor: palette.cardSoft }]} />
              <View style={[styles.lineSm, { backgroundColor: palette.cardSoft }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: ms(14),
    gap: ms(12),
  },
  hero: {
    height: ms(180),
    borderRadius: ms(30),
    borderWidth: 1,
  },
  stack: {
    gap: ms(10),
  },
  row: {
    borderRadius: ms(24),
    borderWidth: 1,
    padding: ms(12),
    flexDirection: "row",
    gap: ms(12),
  },
  thumb: {
    width: ms(88),
    height: ms(104),
    borderRadius: ms(18),
  },
  copy: {
    flex: 1,
    gap: ms(10),
    paddingTop: ms(6),
  },
  lineLg: {
    width: "80%",
    height: ms(18),
    borderRadius: ms(999),
  },
  lineMd: {
    width: "56%",
    height: ms(12),
    borderRadius: ms(999),
  },
  lineSm: {
    width: "35%",
    height: ms(12),
    borderRadius: ms(999),
  },
});
