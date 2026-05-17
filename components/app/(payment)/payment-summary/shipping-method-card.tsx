import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { PaymentSummaryTotals } from "./data";
import SectionShell from "./section-shell";

export default function ShippingMethodCard({
  totals,
}: {
  totals: PaymentSummaryTotals;
}) {
  const palette = useCartPalette();

  return (
    <SectionShell>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, { backgroundColor: palette.accentStrong }]}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={ms(18)}
              color={palette.white}
            />
          </View>
          <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
            Shipping method
          </AppText>
        </View>
        <View style={styles.switchWrap}>
          <AppText
            font="SemiBold"
            fontSize="Text"
            style={{ color: palette.accentStrong }}
          >
            Switch
          </AppText>
          <Feather name="chevron-right" size={ms(18)} color={palette.accentStrong} />
        </View>
      </View>

      <View style={[styles.notice, { backgroundColor: "#FFF1EB" }]}>
        <Feather name="bell" size={ms(18)} color={palette.accentStrong} />
        <AppText
          font="Medium"
          fontSize="Text"
          style={{ color: palette.accentStrong, flex: 1 }}
        >
          Shipping option that allows most items to be sent selected
        </AppText>
      </View>

      <View style={[styles.optionCard, { borderColor: palette.border }]}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          Direct shipping-Standard
        </AppText>
        <View style={styles.priceRow}>
          <AppText
            font="Bold"
            fontSize="Title"
            style={{ color: palette.accentStrong }}
          >
            {handleFormatCurrency(totals.shippingTotal)}
          </AppText>
          <AppText
            font="Medium"
            fontSize="SubText"
            style={{
              color: palette.subtext,
              textDecorationLine: "line-through",
            }}
          >
            {handleFormatCurrency(totals.shippingBase)}
          </AppText>
        </View>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
          ETA: 9-12 days after seller ships
        </AppText>
        {totals.shippingPromotion > 0 && (
          <View style={styles.freeRow}>
            <MaterialCommunityIcons
              name="truck-check"
              size={ms(16)}
              color={palette.success}
            />
            <AppText
              font="SemiBold"
              fontSize="SubText"
              style={{ color: palette.success }}
            >
              Free shipping over $14.00 applied
            </AppText>
          </View>
        )}
      </View>

      <View style={[styles.segment, { borderColor: palette.border }]}>
        <View style={[styles.segmentActive, { backgroundColor: palette.accentStrong }]}>
          <AppText font="SemiBold" fontSize="Text" style={{ color: palette.white }}>
            Doorstep delivery
          </AppText>
        </View>
        <View style={styles.segmentInactive}>
          <AppText font="SemiBold" fontSize="Text" style={{ color: palette.subtext }}>
            Self-pickup
          </AppText>
        </View>
      </View>
    </SectionShell>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  iconWrap: {
    width: ms(34),
    height: ms(34),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  switchWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  notice: {
    borderRadius: ms(8),
    padding: ms(12),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  optionCard: {
    borderRadius: ms(14),
    borderWidth: 1,
    padding: ms(14),
    gap: ms(6),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: ms(4),
  },
  freeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
  },
  segment: {
    borderRadius: ms(10),
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  segmentActive: {
    flex: 1,
    alignItems: "center",
    paddingVertical: ms(10),
  },
  segmentInactive: {
    flex: 1,
    alignItems: "center",
    paddingVertical: ms(10),
  },
});
