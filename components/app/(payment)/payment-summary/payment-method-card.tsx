import AppText from "@/components/common/app-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import SectionShell from "./section-shell";

export default function PaymentMethodCard() {
  const palette = useCartPalette();

  return (
    <SectionShell>
      <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
        Payment method
      </AppText>

      <View style={styles.methodTitleRow}>
        <View style={[styles.iconWrap, { backgroundColor: palette.accentStrong }]}>
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={ms(18)}
            color={palette.white}
          />
        </View>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          Credit/Debit Card
        </AppText>
      </View>

      <View style={styles.optionRow}>
        <View style={styles.cardMeta}>
          <AppText font="Bold" fontSize="SubText" style={{ color: "#2544A1" }}>
            VISA
          </AppText>
          <AppText font="Medium" fontSize="Text" style={{ color: palette.text }}>
            **** 9160
          </AppText>
        </View>
        <View style={[styles.selectedDot, { backgroundColor: palette.accentStrong }]}>
          <Feather name="check" size={ms(18)} color={palette.white} />
        </View>
      </View>

      <View style={styles.expandRow}>
        <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
          expand
        </AppText>
        <Feather name="chevron-down" size={ms(15)} color={palette.subtext} />
      </View>

      <View style={styles.optionRow}>
        <View style={styles.cardMeta}>
          <AppText font="Bold" fontSize="SubText" style={{ color: palette.text }}>
            Apple Pay
          </AppText>
        </View>
        <View style={[styles.emptyDot, { borderColor: palette.border }]} />
      </View>
    </SectionShell>
  );
}

const styles = StyleSheet.create({
  methodTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  iconWrap: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(12),
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(14),
  },
  selectedDot: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  emptyDot: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(999),
    borderWidth: 2,
  },
  expandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(4),
    paddingLeft: ms(62),
  },
});
