import AppText from "@/components/common/app-text";
import BottomSheet, {
  BottomSheetRef,
} from "@/components/common/bottomsheet/bottom-sheet";
import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { ProductDetail } from "./data";
import { ProductActionMode } from "./sticky-action-bar";

export default function PurchaseOptionsSheet({
  mode,
  onClose,
  product,
}: {
  mode: ProductActionMode | null;
  onClose: () => void;
  product: ProductDetail;
}) {
  const sheetRef = useRef<BottomSheetRef>(null);
  const insets = useSafeAreaInsets();
  const palette = useCartPalette();
  const firstVariantId = product.variants[0]?.id;
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(firstVariantId);
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ??
    product.variants[0];
  const isBuyNow = mode === "buy";

  useEffect(() => {
    setSelectedVariantId(firstVariantId);
    setQuantity(1);
  }, [firstVariantId, product.id]);

  useEffect(() => {
    if (mode) {
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [mode]);

  const handlePrimaryPress = () => {
    sheetRef.current?.close();

    if (isBuyNow) {
      NavigationHelper.navigate({ pathname: Screen.Payment.payment_summary });
    }
  };

  if (!selectedVariant) {
    return null;
  }

  return (
    <BottomSheet
      ref={sheetRef}
      duration={320}
      closeYThreshold={ms(96)}
      onClose={onClose}
    >
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: palette.card,
            paddingBottom: Math.max(insets.bottom, ms(12)),
          },
        ]}
      >
        <View style={styles.handle} />
        <View style={styles.header}>
          <View style={styles.serviceRow}>
            <MaterialCommunityIcons
              name={isBuyNow ? "truck-fast-outline" : "shield-check"}
              size={ms(18)}
              color={palette.accentStrong}
            />
            <AppText
              font="Medium"
              fontSize="Text"
              style={{ color: palette.accentStrong }}
            >
              {isBuyNow ? "Free shipping over $14" : "Local returns"}
            </AppText>
          </View>
          <Pressable onPress={() => sheetRef.current?.close()} style={styles.closeButton}>
            <Feather name="x" size={ms(22)} color={palette.text} />
          </Pressable>
        </View>

        <View style={styles.summaryRow}>
          <Image
            source={{ uri: product.image }}
            contentFit="cover"
            style={styles.image}
          />
          <View style={styles.summaryContent}>
            <View style={styles.priceRow}>
              <AppText
                font="Bold"
                fontSize="HeroText"
                style={{ color: palette.accentStrong }}
              >
                {handleFormatCurrency(selectedVariant.price)}
              </AppText>
              <View
                style={[
                  styles.discountPill,
                  { backgroundColor: palette.accentStrong },
                ]}
              >
                <AppText
                  font="Bold"
                  fontSize="SubText"
                  style={{ color: palette.white }}
                >
                  {selectedVariant.discountLabel}
                </AppText>
              </View>
            </View>
            <View style={styles.quantityRow}>
              <Pressable
                onPress={() => setQuantity((current) => Math.max(current - 1, 1))}
                style={[styles.quantityButton, { backgroundColor: palette.cardSoft }]}
              >
                <AppText
                  font="Bold"
                  fontSize="SubTitle"
                  style={{ color: palette.subtext }}
                >
                  -
                </AppText>
              </Pressable>
              <AppText
                font="Bold"
                fontSize="Text"
                style={[styles.quantityValue, { color: palette.text }]}
              >
                {quantity}
              </AppText>
              <Pressable
                onPress={() => setQuantity((current) => current + 1)}
                style={[styles.quantityButton, { backgroundColor: palette.cardSoft }]}
              >
                <AppText
                  font="Bold"
                  fontSize="SubTitle"
                  style={{ color: palette.text }}
                >
                  +
                </AppText>
              </Pressable>
              <AppText
                font="Medium"
                fontSize="Text"
                style={{ color: palette.subtext }}
              >
                In stock
              </AppText>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: palette.border }]} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionContent}
        >
          <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
            Select variation
          </AppText>
          <View style={styles.optionGrid}>
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariantId;

              return (
                <Pressable
                  key={variant.id}
                  onPress={() => setSelectedVariantId(variant.id)}
                  style={[
                    styles.optionPill,
                    {
                      backgroundColor: isSelected
                        ? palette.accentStrong
                        : palette.cardSoft,
                    },
                  ]}
                >
                  <AppText
                    font="Medium"
                    fontSize="Text"
                    style={{
                      color: isSelected ? palette.white : palette.text,
                    }}
                  >
                    {variant.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <Pressable
          onPress={handlePrimaryPress}
          style={[
            styles.primaryButton,
            {
              backgroundColor: isBuyNow
                ? palette.accentStrong
                : palette.text,
            },
          ]}
        >
          <AppText font="Bold" fontSize="Title" style={{ color: palette.white }}>
            {isBuyNow ? "Buy now" : "Add to cart"}
          </AppText>
        </Pressable>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: Dimension.ScreenWidth,
    minHeight: Dimension.ScreenHeight * 0.8,
    maxHeight: Dimension.ScreenHeight * 0.9,
    borderTopLeftRadius: ms(22),
    borderTopRightRadius: ms(22),
    paddingHorizontal: ms(16),
    paddingTop: ms(10),
  },
  handle: {
    alignSelf: "center",
    width: ms(42),
    height: ms(4),
    borderRadius: ms(999),
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    marginBottom: ms(12),
  },
  header: {
    minHeight: ms(30),
    alignItems: "center",
    justifyContent: "center",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: ms(2),
  },
  summaryRow: {
    flexDirection: "row",
    gap: ms(14),
    paddingTop: ms(16),
    paddingBottom: ms(14),
  },
  image: {
    width: ms(88),
    height: ms(88),
    borderRadius: ms(8),
  },
  summaryContent: {
    flex: 1,
    gap: ms(18),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  discountPill: {
    borderRadius: ms(4),
    paddingHorizontal: ms(6),
    paddingVertical: ms(2),
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(12),
  },
  quantityButton: {
    width: ms(34),
    height: ms(34),
    borderRadius: ms(4),
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    minWidth: ms(22),
    textAlign: "center",
  },
  divider: {
    height: 1,
    marginHorizontal: ms(-16),
  },
  optionContent: {
    paddingVertical: ms(18),
    gap: ms(14),
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ms(10),
  },
  optionPill: {
    borderRadius: ms(6),
    paddingHorizontal: ms(16),
    paddingVertical: ms(11),
  },
  primaryButton: {
    borderRadius: ms(999),
    alignItems: "center",
    paddingVertical: ms(15),
    marginTop: ms(8),
  },
});
