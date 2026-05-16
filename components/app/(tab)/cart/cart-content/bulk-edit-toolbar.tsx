import AppText from "@/components/common/app-text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { getCartPalette } from "./palette";

export default function BulkEditToolbar({
  selectedCount,
  onDelete,
  onMoveToWishlist,
}: {
  selectedCount: number;
  onDelete: () => void;
  onMoveToWishlist: () => void;
}) {
  const palette = getCartPalette(false);

  return (
    <View style={[styles.container, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.text }}>
        {selectedCount} selected
      </AppText>
      <View style={styles.actions}>
        <Pressable onPress={onMoveToWishlist} style={[styles.button, { backgroundColor: palette.cardSoft }]}>
          <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.text }}>
            Move to wishlist
          </AppText>
        </Pressable>
        <Pressable onPress={onDelete} style={[styles.button, { backgroundColor: palette.danger }]}>
          <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.white }}>
            Delete
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(22),
    borderWidth: 1,
    padding: ms(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  actions: {
    flexDirection: "row",
    gap: ms(8),
  },
  button: {
    borderRadius: ms(16),
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
  },
});
