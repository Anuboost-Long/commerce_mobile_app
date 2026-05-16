import AppText from "@/components/common/app-text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { getCartPalette } from "./palette";

export default function UndoSnackbar({
  label,
  onUndo,
  visible,
}: {
  label: string;
  onUndo: () => void;
  visible: boolean;
}) {
  const palette = getCartPalette(false);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: palette.cardStrong, borderColor: palette.border }]}>
      <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
        {label}
      </AppText>
      <Pressable onPress={onUndo}>
        <AppText font="SemiBold" fontSize="Text" style={{ color: palette.accentStrong }}>
          Undo
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: ms(18),
    right: ms(18),
    bottom: ms(104),
    borderRadius: ms(18),
    borderWidth: 1,
    paddingHorizontal: ms(14),
    paddingVertical: ms(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
