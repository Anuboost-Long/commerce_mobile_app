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
    title: "Information We Collect",
    body: "We collect information you provide when creating an account, placing orders, or contacting support — including your name, email, shipping address, and payment details. We also gather usage data such as browsing history within the app, search queries, and items added to your cart or wish list.",
  },
  {
    title: "How We Use Your Data",
    body: "Your information is used to process and fulfil orders, personalise your shopping experience, send order confirmations and shipping updates, and improve our services. We will only send promotional communications with your explicit consent, and you may opt out at any time.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell your personal information. We share data only with trusted service providers who assist in operating our platform — including payment processors, logistics partners, and cloud infrastructure providers — all bound by strict confidentiality agreements.",
  },
  {
    title: "Data Retention & Security",
    body: "We retain your personal data for as long as your account is active or as needed to provide services. Industry-standard encryption is applied to protect your data in transit and at rest. You may request deletion of your account at any time through Settings.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete the personal information we hold about you. You may also request a portable copy of your data or object to certain processing activities. To exercise any of these rights, contact our privacy team using the details below.",
  },
  {
    title: "Contact",
    body: "For privacy-related enquiries write to us at privacy@store.com. We aim to respond to all requests within 30 days.",
  },
];

export default function PrivacyPolicies() {
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
          <Feather name="shield" size={ms(32)} color={colors.primary} />
        </View>
        <SizedBox height={16} />
        <AppText font="Bold" fontSize="Title" style={{ color: colors.white, textAlign: "center" }}>
          Your Privacy, Protected
        </AppText>
        <SizedBox height={8} />
        <AppText font="Medium" fontSize="SubTitle" style={{ color: colors.white, textAlign: "center", lineHeight: ms(22), opacity: 0.85 }}>
          This policy explains what personal information we collect, how we use it, and the choices you have.
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
