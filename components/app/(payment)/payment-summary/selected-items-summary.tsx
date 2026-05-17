import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { PaymentSellerGroup } from "./data";
import SectionShell from "./section-shell";

export default function SelectedItemsSummary({
  groups,
}: {
  groups: PaymentSellerGroup[];
}) {
  const palette = useCartPalette();

  if (groups.length === 0) {
    return (
      <SectionShell>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          No items selected
        </AppText>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
          Select items from your cart before confirming an order.
        </AppText>
      </SectionShell>
    );
  }

  return (
    <>
      {groups.map((group) => (
        <SectionShell key={group.id}>
          <View style={styles.storeRow}>
            <MaterialCommunityIcons
              name="storefront"
              size={ms(18)}
              color={palette.accentStrong}
            />
            <AppText
              font="Bold"
              fontSize="Title"
              numLines={1}
              style={{ color: palette.text }}
            >
              {group.name}
            </AppText>
          </View>

          {group.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image
                source={{ uri: item.image }}
                placeholder={{ uri: item.imageThumb }}
                contentFit="cover"
                transition={180}
                style={styles.thumb}
              />
              <View style={styles.itemCopy}>
                <AppText
                  font="Medium"
                  fontSize="Text"
                  numLines={1}
                  style={{ color: palette.text }}
                >
                  {item.title}
                </AppText>
                <View style={[styles.variantPill, { backgroundColor: palette.cardSoft }]}>
                  <AppText
                    font="Medium"
                    fontSize="SubText"
                    numLines={1}
                    style={{ color: palette.subtext }}
                  >
                    {item.variant}; {item.skinFocus}
                  </AppText>
                </View>
                <View style={styles.freeRow}>
                  <MaterialCommunityIcons
                    name="truck-check"
                    size={ms(15)}
                    color={palette.success}
                  />
                  <AppText
                    font="SemiBold"
                    fontSize="SubText"
                    numLines={1}
                    style={{ color: palette.success }}
                  >
                    Free shipping.Local returns
                  </AppText>
                </View>
                <View style={styles.priceRow}>
                  <View style={styles.priceCopy}>
                    <View style={styles.inlinePrice}>
                      <AppText
                        font="Bold"
                        fontSize="Title"
                        style={{ color: palette.accentStrong }}
                      >
                        {handleFormatCurrency(item.unitPrice)}
                      </AppText>
                      <AppText
                        font="Medium"
                        fontSize="SubText"
                        style={{
                          color: palette.subtext,
                          textDecorationLine: "line-through",
                        }}
                      >
                        {handleFormatCurrency(item.compareAtPrice)}
                      </AppText>
                    </View>
                    <AppText
                      font="Medium"
                      fontSize="SubText"
                      style={{ color: palette.accentStrong }}
                    >
                      Discounted price
                    </AppText>
                  </View>
                  <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
                    x{item.quantity}
                  </AppText>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.etaWrap}>
            <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
              ETA:9-12 days after seller ships
            </AppText>
            <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
              Free shipping within Mainland of China
            </AppText>
          </View>

          <View style={styles.remarksRow}>
            <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
              Order remarks
            </AppText>
            <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
              Optional
            </AppText>
          </View>
        </SectionShell>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  itemRow: {
    flexDirection: "row",
    gap: ms(12),
  },
  thumb: {
    width: ms(92),
    height: ms(92),
    borderRadius: ms(10),
  },
  itemCopy: {
    flex: 1,
    gap: ms(5),
  },
  variantPill: {
    borderRadius: ms(999),
    paddingHorizontal: ms(8),
    paddingVertical: ms(3),
  },
  freeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: ms(8),
  },
  priceCopy: {
    flex: 1,
    gap: ms(1),
  },
  inlinePrice: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: ms(4),
  },
  etaWrap: {
    gap: ms(6),
    paddingTop: ms(4),
  },
  remarksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
