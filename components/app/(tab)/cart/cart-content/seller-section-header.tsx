import AppText from "@/components/common/app-text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { CartSellerGroup } from "./data";
import { getCartPalette } from "./palette";

export default function SellerSectionHeader({
  bulkMode,
  group,
  onToggleCollapse,
  onToggleSelectAll,
  selectedCount,
}: {
  bulkMode: boolean;
  group: CartSellerGroup & { data: any[] };
  onToggleCollapse: (groupId: string) => void;
  onToggleSelectAll: (group: CartSellerGroup) => void;
  selectedCount: number;
}) {
  const palette = getCartPalette(false);
  const freeShippingProgress = Math.min(
    group.freeShippingCurrent / group.freeShippingThreshold,
    1
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <View style={styles.topRow}>
        <Pressable onPress={() => onToggleCollapse(group.id)} style={styles.nameWrap}>
          <AppText font="Bold" fontSize="SubTitle" style={{ color: palette.text }}>
            {group.name}
          </AppText>
          <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
            {group.collapsed ? "Tap to expand" : `${group.items.length} products`}
          </AppText>
        </Pressable>

        {bulkMode ? (
          <Pressable
            onPress={() => onToggleSelectAll(group)}
            style={[styles.selectButton, { backgroundColor: palette.accentSoft }]}
          >
            <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.accentStrong }}>
              {selectedCount === group.items.length ? "Clear all" : "Select all"}
            </AppText>
          </Pressable>
        ) : (
          <View style={[styles.couponPill, { backgroundColor: palette.cardSoft }]}>
            <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.roseGold }}>
              {group.couponHint}
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.progressMeta}>
        <View style={[styles.progressTrack, { backgroundColor: palette.cardSoft }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${freeShippingProgress * 100}%`, backgroundColor: palette.accentStrong },
            ]}
          />
        </View>
        <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
          {freeShippingProgress >= 1
            ? "Free shipping unlocked"
            : `Add $${Math.max(
                group.freeShippingThreshold - group.freeShippingCurrent,
                0
              ).toFixed(0)} for free shipping`}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(24),
    borderWidth: 1,
    padding: ms(12),
    gap: ms(10),
    marginBottom: ms(8),
    marginTop: ms(4),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ms(12),
    alignItems: "center",
  },
  nameWrap: {
    flex: 1,
    gap: ms(2),
  },
  couponPill: {
    maxWidth: "46%",
    borderRadius: ms(16),
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
  },
  selectButton: {
    borderRadius: ms(16),
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
  },
  progressMeta: {
    gap: ms(6),
  },
  progressTrack: {
    height: ms(8),
    borderRadius: ms(999),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: ms(999),
  },
});
