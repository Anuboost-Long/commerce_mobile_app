import AppText from "@/components/common/app-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartItem } from "./data";
import { getCartPalette } from "./palette";

export default function QuantityStepper({
  item,
  onChange,
}: {
  item: CartItem;
  onChange: (itemId: string, quantity: number) => void;
}) {
  const palette = getCartPalette(false);
  const [draftQuantity, setDraftQuantity] = useState(String(item.quantity));

  return (
    <View style={[styles.container, { backgroundColor: palette.cardStrong, borderColor: palette.border }]}>
      <Pressable
        onPress={() => onChange(item.id, item.quantity - 1)}
        style={[styles.button, { backgroundColor: palette.cardSoft }]}
        accessibilityLabel={`Decrease quantity for ${item.title}`}
      >
        <AppText font="Bold" fontSize="SubTitle" style={{ color: palette.text }}>
          -
        </AppText>
      </Pressable>

      <TextInput
        value={draftQuantity}
        onChangeText={setDraftQuantity}
        onEndEditing={() => {
          const next = Number(draftQuantity);
          onChange(item.id, Number.isFinite(next) ? next : item.quantity);
          setDraftQuantity(String(Number.isFinite(next) ? next : item.quantity));
        }}
        keyboardType="number-pad"
        style={[styles.input, { color: palette.text }]}
        accessibilityLabel={`Quantity for ${item.title}`}
      />

      <Pressable
        onPress={() => onChange(item.id, item.quantity + 1)}
        style={[styles.button, { backgroundColor: palette.cardSoft }]}
        accessibilityLabel={`Increase quantity for ${item.title}`}
      >
        <AppText font="Bold" fontSize="SubTitle" style={{ color: palette.text }}>
          +
        </AppText>
      </Pressable>

      {item.syncState === "pending" && (
        <MaterialCommunityIcons
          name="cloud-sync-outline"
          size={ms(16)}
          color={palette.accentStrong}
        />
      )}
      {item.syncState === "confirmed" && (
        <MaterialCommunityIcons
          name="check-circle"
          size={ms(16)}
          color={palette.success}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
    borderRadius: ms(18),
    borderWidth: 1,
    paddingHorizontal: ms(6),
    paddingVertical: ms(4),
  },
  button: {
    width: ms(30),
    height: ms(30),
    borderRadius: ms(12),
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    minWidth: ms(30),
    textAlign: "center",
    paddingVertical: 0,
  },
});
