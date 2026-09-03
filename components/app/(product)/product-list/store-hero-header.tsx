import AppText from "@/components/common/app-text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function StoreHeroHeader() {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card }]}>
      <View style={styles.row}>
        <View style={[styles.logoCircle, { backgroundColor: palette.accentStrong }]}>
          <AppText font="Bold" fontSize="Text" style={{ color: palette.white }}>
            优思顿
          </AppText>
        </View>

        <View style={styles.info}>
          <AppText font="SemiBold" fontSize="Text" style={{ color: palette.text }} numLines={1}>
            You Si Dun Shu Ma Flagship Store
          </AppText>
          <View style={styles.metaRow}>
            <View style={[styles.platformBadge, { backgroundColor: palette.accentStrong }]}>
              <AppText font="Bold" fontSize="SubText" style={{ color: palette.white }}>
                TMALL
              </AppText>
            </View>
            <AppText font="Normal" fontSize="SubText" style={{ color: palette.subtext }}>
              331K+ Followers
            </AppText>
          </View>
        </View>

        <Pressable style={[styles.followBtn, { backgroundColor: palette.accentStrong }]}>
          <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.white }}>
            Follow
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(14),
    paddingVertical: ms(12),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  logoCircle: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: ms(4),
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
  },
  platformBadge: {
    paddingHorizontal: ms(5),
    paddingVertical: ms(2),
    borderRadius: ms(3),
  },
  followBtn: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(8),
    borderRadius: ms(999),
  },
});
