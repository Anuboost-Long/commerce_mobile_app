import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export const PRODUCT_ACTION_BAR_HEIGHT = ms(78);

export type ProductActionMode = "cart" | "buy";

export default function StickyActionBar({
  onActionPress,
}: {
  onActionPress: (mode: ProductActionMode) => void;
}) {
  const insets = useSafeAreaInsets();
  const palette = useCartPalette();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
          paddingBottom: Math.max(insets.bottom, ms(10)),
        },
      ]}
    >
      <View style={styles.iconActions}>
        <Pressable style={styles.smallAction}>
          <MaterialCommunityIcons
            name="storefront-outline"
            size={ms(24)}
            color={palette.text}
          />
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
            Store
          </AppText>
        </Pressable>
        <Pressable style={styles.smallAction}>
          <Feather name="message-circle" size={ms(24)} color={palette.text} />
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
            Chat
          </AppText>
        </Pressable>
        <Pressable style={styles.smallAction}>
          <Feather name="star" size={ms(24)} color={palette.text} />
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
            Wishlist
          </AppText>
        </Pressable>
      </View>
      <View style={styles.primaryActions}>
        <Pressable
          onPress={() => onActionPress("cart")}
          style={[styles.addButton, { backgroundColor: palette.text }]}
        >
          <AppText font="Bold" fontSize="Text" style={{ color: palette.card }}>
            Add to cart
          </AppText>
        </Pressable>
        <Pressable
          onPress={() => onActionPress("buy")}
          style={[styles.buyButton, { backgroundColor: palette.accentStrong }]}
        >
          <AppText font="Bold" fontSize="Text" style={{ color: palette.white }}>
            Buy now
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    paddingHorizontal: ms(12),
    paddingTop: ms(10),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  iconActions: {
    flexDirection: "row",
    gap: ms(10),
  },
  smallAction: {
    width: ms(48),
    alignItems: "center",
    gap: ms(3),
  },
  primaryActions: {
    flex: 1,
    flexDirection: "row",
    borderRadius: ms(10),
    overflow: "hidden",
  },
  addButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: ms(14),
  },
  buyButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: ms(14),
  },
});
