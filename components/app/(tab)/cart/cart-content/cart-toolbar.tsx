import AppText from "@/components/common/app-text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartCurrencyMode } from "./data";
import { useCartPalette } from "./palette";

interface CartToolbarProps {
  bulkMode: boolean;
  currencyMode: CartCurrencyMode;
  loyaltyPoints: number;
  onToggleBulkMode: () => void;
  onToggleCurrencyMode: (mode: CartCurrencyMode) => void;
}

export default function CartToolbar({
  bulkMode,
  currencyMode,
  loyaltyPoints,
  onToggleBulkMode,
  onToggleCurrencyMode,
}: CartToolbarProps) {
  const palette = useCartPalette();

  return (
    <View style={styles.row}>
      <View style={[styles.toggleWrap, { backgroundColor: palette.card, borderColor: palette.border }]}>
        {(["currency", "points"] as CartCurrencyMode[]).map((mode) => (
          <Pressable
            key={mode}
            onPress={() => onToggleCurrencyMode(mode)}
            style={[
              styles.toggleButton,
              currencyMode === mode && { backgroundColor: palette.accentSoft },
            ]}
          >
            <AppText
              font="SemiBold"
              fontSize="SubText"
              style={{ color: currencyMode === mode ? palette.accentStrong : palette.subtext }}
            >
              {mode === "currency" ? "Currency" : "Points"}
            </AppText>
          </Pressable>
        ))}
      </View>

      <View style={[styles.metaCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.subtext }}>
          {loyaltyPoints.toLocaleString()} pts available
        </AppText>
      </View>

      <Pressable
        onPress={onToggleBulkMode}
        style={[styles.editButton, { backgroundColor: bulkMode ? palette.accentStrong : palette.cardStrong }]}
      >
        <AppText font="SemiBold" fontSize="SubText" style={{ color: bulkMode ? palette.white : palette.text }}>
          {bulkMode ? "Done" : "Bulk Edit"}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  toggleWrap: {
    flex: 1,
    borderRadius: ms(20),
    borderWidth: 1,
    padding: ms(4),
    flexDirection: "row",
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ms(9),
    borderRadius: ms(16),
  },
  metaCard: {
    borderRadius: ms(18),
    borderWidth: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(11),
  },
  editButton: {
    borderRadius: ms(18),
    paddingHorizontal: ms(12),
    paddingVertical: ms(11),
  },
});
