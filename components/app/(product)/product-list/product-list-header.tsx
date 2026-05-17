import { IconAsset } from "@/assets/icon-asset";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function ProductListHeader({ query }: { query: string }) {
  const insets = useSafeAreaInsets();
  const palette = useCartPalette();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette.card, paddingTop: insets.top + ms(10) },
      ]}
    >
      <Pressable
        onPress={NavigationHelper.back}
        style={styles.backButton}
        accessibilityLabel="Go back"
      >
        <Feather name="arrow-left" size={ms(28)} color={palette.text} />
      </Pressable>
      <View
        style={[
          styles.searchBox,
          { borderColor: palette.accentStrong, backgroundColor: palette.card },
        ]}
      >
        <TextInput
          editable={false}
          value={query}
          style={[styles.input, { color: palette.text }]}
        />
        <IconAsset.Search
          width={ms(22)}
          height={ms(22)}
          fill={palette.text}
        />
      </View>
      <Pressable style={styles.moreButton} accessibilityLabel="More options">
        <Feather name="more-horizontal" size={ms(25)} color={palette.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(14),
    paddingBottom: ms(12),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  backButton: {
    width: ms(36),
    height: ms(44),
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    flex: 1,
    height: ms(48),
    borderRadius: ms(999),
    borderWidth: 2,
    paddingHorizontal: ms(16),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  moreButton: {
    width: ms(36),
    height: ms(44),
    alignItems: "center",
    justifyContent: "center",
  },
});
