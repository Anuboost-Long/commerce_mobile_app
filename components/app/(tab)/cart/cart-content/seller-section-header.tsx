import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartSellerGroup } from "./data";
import { useCartPalette } from "./palette";

export default function SellerSectionHeader({
  group,
  onToggleSelectAll,
  selectedCount,
}: {
  group: CartSellerGroup & { data: any[] };
  onToggleSelectAll: (group: CartSellerGroup) => void;
  selectedCount: number;
}) {
  const palette = useCartPalette();
  const isSelected = selectedCount === group.items.length;

  return (
    <Pressable
      onPress={() => onToggleSelectAll(group)}
      style={[
        styles.container,
        { backgroundColor: palette.card, borderColor: palette.border },
      ]}
      accessibilityLabel={`Select all items from ${group.name}`}
    >
      <View
        style={[
          styles.selectionCircle,
          {
            backgroundColor: isSelected ? palette.accentStrong : palette.cardSoft,
            borderColor: isSelected ? palette.accentStrong : palette.border,
          },
        ]}
      >
        {isSelected && (
          <Feather name="check" size={ms(14)} color={palette.white} />
        )}
      </View>
      <AppText
        font="Bold"
        fontSize="SubTitle"
        numLines={1}
        style={{ color: palette.text }}
      >
        {group.name}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(14),
    borderWidth: 1,
    paddingHorizontal: ms(8),
    paddingVertical: ms(8),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
    marginBottom: ms(6),
    marginTop: ms(2),
  },
  selectionCircle: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(999),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
