import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "./palette";

export default function CartHeaderHero({
  itemCount,
  onToggleBulkEdit,
  selectedCount,
}: {
  itemCount: number;
  onToggleBulkEdit: () => void;
  selectedCount: number;
}) {
  const palette = useCartPalette();
  const isEditing = selectedCount > 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette.card, borderColor: palette.border },
      ]}
    >
      <View style={styles.copyWrap}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          Cart
        </AppText>
        <AppText
          font="Medium"
          fontSize="SubText"
          style={{ color: palette.subtext }}
        >
          {isEditing ? `${selectedCount} selected` : `${itemCount} items`}
        </AppText>
      </View>
      <Pressable
        onPress={onToggleBulkEdit}
        style={[
          styles.editButton,
          { backgroundColor: isEditing ? palette.cardSoft : palette.accentSoft },
        ]}
        accessibilityLabel={isEditing ? "Exit bulk edit" : "Bulk edit cart"}
      >
        <Feather
          name={isEditing ? "check" : "edit-3"}
          size={ms(15)}
          color={palette.accentStrong}
        />
        <AppText
          font="SemiBold"
          fontSize="SubText"
          style={{ color: palette.accentStrong }}
        >
          {isEditing ? "Done" : "Edit"}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(14),
    borderWidth: 1,
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  copyWrap: {
    flex: 1,
    gap: ms(2),
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
    borderRadius: ms(999),
    paddingHorizontal: ms(12),
    paddingVertical: ms(8),
  },
});
