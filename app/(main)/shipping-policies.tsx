import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const SECTIONS = [
  {
    title: "Order Processing",
    body: "Orders are processed within 1–2 business days after payment confirmation, excluding weekends and public holidays. You will receive an email confirmation with your order details immediately after placing your order, and a separate shipping notification once your parcel is dispatched.",
  },
  {
    title: "Domestic Shipping",
    body: "Standard shipping (3–7 business days) is available on all domestic orders. Express shipping (1–2 business days) is available for an additional fee. Orders over $50 qualify for free standard shipping. Delivery times are estimates and may vary during peak periods.",
  },
  {
    title: "International Shipping",
    body: "We ship to over 50 countries. International orders typically arrive within 7–21 business days depending on destination and customs processing. Import duties, taxes, and customs fees are the responsibility of the recipient and are not included in the order total.",
  },
  {
    title: "Order Tracking",
    body: "Once your order is shipped, you will receive a tracking number via email. You can track your parcel in real time through the carrier's website or directly in the My Orders section of the app. Please allow up to 24 hours for tracking information to become active.",
  },
  {
    title: "Failed Deliveries",
    body: "If a delivery attempt is unsuccessful, the carrier will typically leave a collection notice. Parcels uncollected after 7 days may be returned to us. In such cases, we will contact you to arrange re-delivery. Additional shipping fees may apply for re-dispatch.",
  },
  {
    title: "Shipping Restrictions",
    body: "Certain products cannot be shipped to specific regions due to local regulations. If your order contains a restricted item, you will be notified at checkout. We are unable to ship to PO Boxes for express or oversized orders.",
  },
];

export default function Page() {
  const { colors } = useTheme();
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: tab_header + ms(12),
          paddingBottom: Math.max(insets.bottom, ms(24)),
        },
      ]}
    >
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View style={styles.heroIconCircle}>
          <Feather name="truck" size={ms(32)} color={colors.primary} />
        </View>
        <SizedBox height={16} />
        <AppText font="Bold" fontSize="Title" style={{ color: colors.white, textAlign: "center" }}>
          Fast & Reliable Delivery
        </AppText>
        <SizedBox height={8} />
        <AppText font="Medium" fontSize="SubTitle" style={{ color: colors.white, textAlign: "center", lineHeight: ms(22), opacity: 0.85 }}>
          We partner with top carriers to ensure your order arrives safely and on time, every time.
        </AppText>
        <SizedBox height={16} />
        <View style={styles.heroBadge}>
          <AppText font="Medium" fontSize="SubText" style={{ color: colors.white }}>
            Last updated: January 1, 2026
          </AppText>
        </View>
      </View>

      {SECTIONS.map((section, index) => (
        <View key={index} style={[styles.section, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
            {section.title}
          </AppText>
          <SizedBox height={8} />
          <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, lineHeight: ms(22) }}>
            {section.body}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ms(16),
    gap: ms(10),
  },
  hero: {
    borderRadius: ms(20),
    padding: ms(22),
    alignItems: "center",
  },
  heroIconCircle: {
    width: ms(72),
    height: ms(72),
    borderRadius: ms(36),
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBadge: {
    paddingHorizontal: ms(14),
    paddingVertical: ms(6),
    borderRadius: ms(999),
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  section: {
    borderRadius: ms(14),
    borderWidth: 1,
    padding: ms(16),
  },
});
