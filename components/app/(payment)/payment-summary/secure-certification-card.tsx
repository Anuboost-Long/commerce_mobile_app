import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import SectionShell from "./section-shell";

export default function SecureCertificationCard() {
  const palette = useCartPalette();

  return (
    <SectionShell>
      <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
        Please read{" "}
        <AppText font="Medium" fontSize="Text" style={{ color: palette.accentStrong }}>
          Overseas Shopping Policies
        </AppText>{" "}
        carefully. Submitting your order signifies your agreement to its terms
        and conditions.
      </AppText>

      <View style={[styles.banner, { backgroundColor: "#FFF0E8" }]}>
        <View style={[styles.iconWrap, { borderColor: palette.accentStrong }]}>
          <Feather name="shield" size={ms(20)} color={palette.accentStrong} />
        </View>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          Secure certification
        </AppText>
      </View>

      <AppText
        font="Medium"
        fontSize="Text"
        style={[styles.bodyCopy, { color: palette.subtext }]}
      >
        Your payment information is strictly for transaction use only. Alipay
        will protect your payment information and only share your card
        information with payment service providers who agreed to safeguard your
        information.
      </AppText>
    </SectionShell>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: ms(10),
    padding: ms(14),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(12),
  },
  iconWrap: {
    width: ms(34),
    height: ms(34),
    borderRadius: ms(999),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyCopy: {
    lineHeight: ms(22),
  },
});
