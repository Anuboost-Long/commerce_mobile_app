import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import CartItemSwipeable from "./cart-item-swipeable";
import { CartCurrencyMode, CartItem, LOYALTY_POINT_RATE } from "./data";
import { useCartPalette } from "./palette";
import QuantityStepper from "./quantity-stepper";

interface CartItemCardProps {
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
  currencyMode,
  item,
  onDelete,
  onOpenImage,
  onQuantityChange,
  onToggleSaved,
  onToggleSelect,
  selected,
}: CartItemCardProps) {
  const palette = useCartPalette();
  const livePriceLabel =
    currencyMode === "currency"
      ? handleFormatCurrency(item.unitPrice)
      : `${Math.round(item.unitPrice * LOYALTY_POINT_RATE)} pts`;

  return (
    <CartItemSwipeable onDelete={onDelete}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: palette.card,
            borderColor: selected ? palette.accentStrong : palette.border,
            shadowColor: palette.shadow,
          },
        ]}
      >
        <Pressable
          onPress={() => onToggleSelect(item.id)}
          style={styles.selectionWrap}
        >
          <View
            style={[
              styles.selectionCircle,
              {
                backgroundColor: selected
                  ? palette.accentStrong
                  : palette.cardSoft,
                borderColor: selected ? palette.accentStrong : palette.border,
              },
            ]}
          >
            {selected && (
              <Feather name="check" size={ms(14)} color={palette.white} />
            )}
          </View>
        </Pressable>

        <Pressable onPress={onOpenImage} style={styles.thumbWrap}>
          <Image
            source={{ uri: item.image }}
            placeholder={{ uri: item.imageThumb }}
            contentFit="cover"
            transition={220}
            style={styles.thumb}
          />
          <View style={[styles.badge, { backgroundColor: palette.accentStrong }]}>
            <AppText
              font="SemiBold"
              fontSize="SubText"
              numLines={1}
              style={{ color: palette.white }}
            >
              {item.badge}
            </AppText>
          </View>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.copyWrap}>
              <AppText
                font="SemiBold"
                fontSize="SubTitle"
                numLines={2}
                style={{ color: palette.text }}
              >
                {item.title}
              </AppText>
              <AppText
                font="Medium"
                fontSize="SubText"
                numLines={1}
                style={{ color: palette.subtext }}
              >
                {item.variant} • {item.skinFocus}
              </AppText>
            </View>
            <View style={styles.iconActions}>
              <Pressable
                onPress={() => onToggleSaved(item.id)}
                accessibilityLabel={`${
                  item.isSavedForLater ? "Remove from" : "Save to"
                } wishlist`}
                hitSlop={ms(8)}
              >
                <MaterialCommunityIcons
                  name={item.isSavedForLater ? "heart" : "heart-outline"}
                  size={ms(18)}
                  color={palette.accentStrong}
                />
              </Pressable>
              <Pressable
                onPress={onDelete}
                accessibilityLabel={`Delete ${item.title}`}
                hitSlop={ms(8)}
              >
                <Feather name="trash-2" size={ms(17)} color={palette.subtext} />
              </Pressable>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusPill,
                { backgroundColor: palette.accentSoft },
              ]}
            >
              <AppText
                font="SemiBold"
                fontSize="SubText"
                numLines={1}
                style={{ color: palette.accentStrong }}
              >
                {item.stockLeft > 0
                  ? `Only ${item.stockLeft} left`
                  : "Out of stock"}
              </AppText>
            </View>
            {item.liveDealMinutesLeft > 0 && (
              <View
                style={[
                  styles.timerPill,
                  { backgroundColor: palette.cardSoft },
                ]}
              >
                <AppText
                  font="SemiBold"
                  fontSize="SubText"
                  numLines={1}
                  style={{ color: palette.roseGold }}
                >
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
                numLines={1}
                style={{ color: palette.text }}
              >
                {livePriceLabel}
              </AppText>
              <AppText
                font="Medium"
                fontSize="SubText"
                numLines={1}
                style={{
                  color: palette.subtext,
                  textDecorationLine: "line-through",
                }}
              >
                {currencyMode === "currency"
                  ? handleFormatCurrency(item.compareAtPrice)
                  : `${Math.round(
                      item.compareAtPrice * LOYALTY_POINT_RATE
                    )} pts`}
              </AppText>
            </View>
            <QuantityStepper item={item} onChange={onQuantityChange} />
          </View>

          {!!item.priceChangeLabel && (
            <View
              style={[styles.liveBanner, { backgroundColor: palette.cardSoft }]}
            >
              <Feather
                name="activity"
                size={ms(14)}
                color={palette.accentStrong}
              />
              <AppText
                font="Medium"
                fontSize="SubText"
                numLines={1}
                style={{ color: palette.accentStrong }}
              >
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
    borderRadius: ms(14),
    borderWidth: 1,
    padding: ms(8),
    flexDirection: "row",
    gap: ms(8),
    marginBottom: ms(6),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  selectionWrap: {
    justifyContent: "flex-start",
    paddingTop: ms(28),
  },
  selectionCircle: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(999),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbWrap: {
    width: ms(78),
  },
  thumb: {
    width: ms(78),
    height: ms(86),
    borderRadius: ms(10),
  },
  badge: {
    position: "absolute",
    left: ms(4),
    top: ms(4),
    maxWidth: ms(70),
    borderRadius: ms(4),
    paddingHorizontal: ms(5),
    paddingVertical: ms(2),
  },
  content: {
    flex: 1,
    gap: ms(6),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ms(8),
  },
  copyWrap: {
    flex: 1,
    gap: ms(2),
  },
  iconActions: {
    flexDirection: "row",
    gap: ms(10),
    paddingTop: ms(2),
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ms(6),
  },
  statusPill: {
    borderRadius: ms(999),
    paddingHorizontal: ms(8),
    paddingVertical: ms(4),
    maxWidth: "58%",
  },
  timerPill: {
    borderRadius: ms(999),
    paddingHorizontal: ms(8),
    paddingVertical: ms(4),
    maxWidth: "42%",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ms(8),
    alignItems: "flex-end",
  },
  priceWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: ms(6),
  },
  liveBanner: {
    borderRadius: ms(10),
    paddingHorizontal: ms(8),
    paddingVertical: ms(5),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
  },
});
