import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { PaymentSummaryTotals } from "./data";
import SectionShell from "./section-shell";

export default function PaymentBreakdown({
  totals,
}: {
  totals: PaymentSummaryTotals;
}) {
  const palette = useCartPalette();

  return (
    <SectionShell>
      <View style={styles.row}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
          Shipping promotion
        </AppText>
        <View style={styles.chevronValue}>
          <AppText
            font="Bold"
            fontSize="Text"
            style={{ color: palette.accentStrong }}
          >
            -{handleFormatCurrency(totals.shippingPromotion)}
          </AppText>
          <Feather name="chevron-right" size={ms(18)} color={palette.subtext} />
        </View>
      </View>

      <View style={styles.row}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
          Promo code
        </AppText>
        <View style={[styles.promoInput, { backgroundColor: palette.cardSoft }]}>
          <TextInput
            placeholder="Please enter"
            placeholderTextColor={palette.subtext}
            style={[styles.input, { color: palette.text }]}
          />
          <AppText
            font="Bold"
            fontSize="Text"
            style={{ color: palette.accentStrong }}
          >
            Apply
          </AppText>
        </View>
      </View>

      <View style={styles.row}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
          Subtotal (USD)
        </AppText>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          {handleFormatCurrency(totals.subtotal)}
        </AppText>
      </View>

      <View style={[styles.divider, { backgroundColor: palette.border }]} />

      <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
        Payment details
      </AppText>
      <View style={styles.row}>
        <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
          Transaction fee
        </AppText>
        <View style={styles.chevronValue}>
          <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
            {handleFormatCurrency(totals.transactionFee)}
          </AppText>
          <Feather name="chevron-right" size={ms(18)} color={palette.subtext} />
        </View>
      </View>
    </SectionShell>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  chevronValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(2),
  },
  promoInput: {
    flex: 1,
    maxWidth: ms(220),
    borderRadius: ms(10),
    paddingHorizontal: ms(14),
    paddingVertical: ms(10),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  divider: {
    height: 1,
  },
});
