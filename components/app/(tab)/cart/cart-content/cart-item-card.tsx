import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { CartCurrencyMode, CartItem, LOYALTY_POINT_RATE } from "./data";
import CartItemSwipeable from "./cart-item-swipeable";
import { getCartPalette } from "./palette";
import QuantityStepper from "./quantity-stepper";

interface CartItemCardProps {
  bulkMode: boolean;
  currencyMode: CartCurrencyMode;
  item: CartItem;
  onDelete: () => void;
  onOpenImage: () => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onToggleSaved: (itemId: string) => void;
  onToggleSelect: (itemId: string) => void;
  selected: boolean;
}

export default function CartItemCard({
  bulkMode,
  currencyMode,
  item,
  onDelete,
  onOpenImage,
  onQuantityChange,
  onToggleSaved,
  onToggleSelect,
  selected,
}: CartItemCardProps) {
  const palette = getCartPalette(false);
  const livePriceLabel =
    currencyMode === "currency"
      ? handleFormatCurrency(item.unitPrice)
      : `${Math.round(item.unitPrice * LOYALTY_POINT_RATE)} pts`;

  return (
    <CartItemSwipeable onDelete={onDelete}>
      <View style={[styles.container, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.shadow }]}>
        {bulkMode && (
          <Pressable onPress={() => onToggleSelect(item.id)} style={styles.selectionWrap}>
            <View
              style={[
                styles.selectionCircle,
                {
                  backgroundColor: selected ? palette.accentStrong : palette.cardSoft,
                  borderColor: palette.border,
                },
              ]}
            >
              {selected && (
                <Feather name="check" size={ms(14)} color={palette.white} />
              )}
            </View>
          </Pressable>
        )}

        <Pressable onPress={onOpenImage} style={styles.thumbWrap}>
          <Image
            source={{ uri: item.image }}
            placeholder={{ uri: item.imageThumb }}
            contentFit="cover"
            transition={220}
            style={styles.thumb}
          />
          <View style={[styles.badge, { backgroundColor: palette.white }]}>
            <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.accentStrong }}>
              {item.badge}
            </AppText>
          </View>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.copyWrap}>
              <AppText font="SemiBold" fontSize="SubTitle" style={{ color: palette.text }}>
                {item.title}
              </AppText>
              <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
                {item.variant} • {item.skinFocus}
              </AppText>
            </View>
            <View style={styles.iconActions}>
              <Pressable
                onPress={() => onToggleSaved(item.id)}
                accessibilityLabel={`${item.isSavedForLater ? "Remove from" : "Save to"} wishlist`}
              >
                <MaterialCommunityIcons
                  name={item.isSavedForLater ? "heart" : "heart-outline"}
                  size={ms(18)}
                  color={palette.accentStrong}
                />
              </Pressable>
              <Pressable onPress={onDelete} accessibilityLabel={`Delete ${item.title}`}>
                <Feather name="trash-2" size={ms(17)} color={palette.subtext} />
              </Pressable>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={[styles.statusPill, { backgroundColor: palette.accentSoft }]}>
              <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.accentStrong }}>
                {item.stockLeft > 0 ? `Only ${item.stockLeft} left` : "Out of stock"}
              </AppText>
            </View>
            {item.liveDealMinutesLeft > 0 && (
              <View style={[styles.timerPill, { backgroundColor: palette.cardSoft }]}>
                <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.roseGold }}>
                  Flash deal {item.liveDealMinutesLeft}m
                </AppText>
              </View>
            )}
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceWrap}>
              <AppText
                font="Bold"
                fontSize="Title"
                style={{ color: palette.text }}
                accessibilityLabel={`Price updated to ${livePriceLabel}`}
              >
                {livePriceLabel}
              </AppText>
              <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext, textDecorationLine: "line-through" }}>
                {currencyMode === "currency"
                  ? handleFormatCurrency(item.compareAtPrice)
                  : `${Math.round(item.compareAtPrice * LOYALTY_POINT_RATE)} pts`}
              </AppText>
            </View>
            <QuantityStepper item={item} onChange={onQuantityChange} />
          </View>

          {!!item.priceChangeLabel && (
            <View style={[styles.liveBanner, { backgroundColor: palette.cardSoft }]}>
              <Feather name="activity" size={ms(14)} color={palette.accentStrong} />
              <AppText font="Medium" fontSize="SubText" style={{ color: palette.accentStrong }}>
                {item.priceChangeLabel}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </CartItemSwipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(24),
    borderWidth: 1,
    padding: ms(12),
    flexDirection: "row",
    gap: ms(12),
    marginBottom: ms(10),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  selectionWrap: {
    justifyContent: "center",
  },
  selectionCircle: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(999),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbWrap: {
    width: ms(92),
    gap: ms(8),
  },
  thumb: {
    width: ms(92),
    height: ms(112),
    borderRadius: ms(20),
  },
  badge: {
    position: "absolute",
    left: ms(6),
    top: ms(6),
    borderRadius: ms(999),
    paddingHorizontal: ms(8),
    paddingVertical: ms(4),
  },
  content: {
    flex: 1,
    gap: ms(10),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ms(12),
  },
  copyWrap: {
    flex: 1,
    gap: ms(2),
  },
  iconActions: {
    flexDirection: "row",
    gap: ms(12),
    paddingTop: ms(2),
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ms(8),
  },
  statusPill: {
    borderRadius: ms(999),
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
  },
  timerPill: {
    borderRadius: ms(999),
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ms(10),
    alignItems: "center",
  },
  priceWrap: {
    flex: 1,
    gap: ms(2),
  },
  liveBanner: {
    borderRadius: ms(16),
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
  },
});
