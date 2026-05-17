import { Screen } from "@/constants/screens";
import useTheme from "@/core/theme/theme-context";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductDetail } from "./data";

export default function HeroMedia({ product }: { product: ProductDetail }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        contentFit="cover"
        transition={220}
        style={styles.image}
      />
      <View style={[styles.overlayRow, { top: insets.top + ms(10) }]}>
        <Pressable
          onPress={NavigationHelper.back}
          style={[styles.iconButton, { backgroundColor: colors.backDrop }]}
          accessibilityLabel="Go back"
        >
          <Feather name="chevron-left" size={ms(26)} color={colors.white} />
        </Pressable>
        <View style={styles.actionRow}>
          <Pressable
            style={[styles.iconButton, { backgroundColor: colors.backDrop }]}
            accessibilityLabel="Share product"
          >
            <Feather name="share-2" size={ms(22)} color={colors.white} />
          </Pressable>
          <Pressable
            onPress={() => NavigationHelper.navigate({ pathname: Screen.Tab.cart })}
            style={[styles.iconButton, { backgroundColor: colors.backDrop }]}
            accessibilityLabel="Open cart"
          >
            <Feather name="shopping-cart" size={ms(22)} color={colors.white} />
          </Pressable>
          <Pressable
            style={[styles.iconButton, { backgroundColor: colors.backDrop }]}
            accessibilityLabel="More options"
          >
            <Feather name="more-horizontal" size={ms(22)} color={colors.white} />
          </Pressable>
        </View>
      </View>
      <View style={[styles.mediaTabs, { backgroundColor: colors.backDrop }]}>
        <Feather name="volume-x" size={ms(17)} color={colors.white} />
        <View style={styles.tabPill}>
          <Feather name="play" size={ms(13)} color={colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ms(430),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlayRow: {
    position: "absolute",
    left: ms(16),
    right: ms(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: ms(10),
  },
  iconButton: {
    width: ms(42),
    height: ms(42),
    borderRadius: ms(10),
    alignItems: "center",
    justifyContent: "center",
  },
  mediaTabs: {
    position: "absolute",
    right: ms(16),
    bottom: ms(12),
    borderRadius: ms(12),
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  tabPill: {
    width: ms(26),
    height: ms(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
