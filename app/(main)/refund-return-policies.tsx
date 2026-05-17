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
    title: "Return Eligibility",
    body: "Items may be returned within 30 days of delivery, provided they are unused, in their original packaging, and accompanied by proof of purchase. Items must be in the same condition as received. We reserve the right to reject returns that do not meet these criteria.",
  },
  {
    title: "How to Initiate a Return",
    body: "To start a return, go to My Orders in your account, select the order and item you wish to return, and follow the on-screen steps. You will receive a prepaid return shipping label via email within 24 hours. Please pack the item securely before handing it to the courier.",
  },
  {
    title: "Refund Timeline",
    body: "Once your return is received and inspected, we will notify you of the approval status. Approved refunds are processed within 3 business days and typically appear in your original payment method within 5–10 business days, depending on your bank or card issuer.",
  },
  {
    title: "Exchanges",
    body: "We offer direct exchanges for items of the same value. If the replacement item is of a different price, a refund or additional charge will be applied accordingly. To request an exchange, follow the same steps as a standard return and select 'Exchange' when prompted.",
  },
  {
    title: "Non-Returnable Items",
    body: "The following items cannot be returned: digital products, personalised or custom-made goods, perishables, intimate apparel, and items marked as 'Final Sale' at the time of purchase. Gift cards are non-refundable.",
  },
  {
    title: "Damaged or Incorrect Items",
    body: "If you received a damaged or incorrect item, please contact our support team within 48 hours of delivery with photos of the issue. We will arrange a free replacement or full refund at no additional cost to you.",
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
          <Feather name="rotate-ccw" size={ms(32)} color={colors.primary} />
        </View>
        <SizedBox height={16} />
        <AppText font="Bold" fontSize="Title" style={{ color: colors.white, textAlign: "center" }}>
          Hassle-Free Returns
        </AppText>
        <SizedBox height={8} />
        <AppText font="Medium" fontSize="SubTitle" style={{ color: colors.white, textAlign: "center", lineHeight: ms(22), opacity: 0.85 }}>
          Not satisfied with your purchase? Our simple return process makes it easy to get a refund or exchange.
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
