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
    title: "Acceptance of Terms",
    body: "By downloading, accessing, or using our application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of the app immediately. We reserve the right to update these terms at any time, and continued use constitutes acceptance.",
  },
  {
    title: "Account Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. Notify us immediately of any unauthorised access.",
  },
  {
    title: "Orders & Payments",
    body: "By placing an order you confirm that you are authorised to use the selected payment method. All prices are displayed in your selected currency and are subject to change. We reserve the right to cancel or refuse any order at our discretion, including in cases of suspected fraud or pricing errors.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this platform — including logos, product images, text, and software — is the property of our company or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.",
  },
  {
    title: "Prohibited Activities",
    body: "You agree not to engage in activities that include but are not limited to: impersonating another person, scraping or harvesting data, uploading malicious code, attempting to gain unauthorised access to our systems, or using the platform for any unlawful purpose.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability for any claim shall not exceed the amount you paid for the transaction giving rise to the claim.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with applicable local laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in our registered jurisdiction.",
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
          <Feather name="file-text" size={ms(32)} color={colors.primary} />
        </View>
        <SizedBox height={16} />
        <AppText font="Bold" fontSize="Title" style={{ color: colors.white, textAlign: "center" }}>
          Our Agreement With You
        </AppText>
        <SizedBox height={8} />
        <AppText font="Medium" fontSize="SubTitle" style={{ color: colors.white, textAlign: "center", lineHeight: ms(22), opacity: 0.85 }}>
          These terms govern your use of our platform. Please read them carefully — they set out your rights and obligations.
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
