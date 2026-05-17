import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const CONTACT_METHODS = [
  {
    icon: "phone" as const,
    label: "Phone",
    value: "+1 (800) 123-4567",
    note: "Mon–Fri, 9 am – 6 pm EST",
  },
  {
    icon: "mail" as const,
    label: "Email",
    value: "support@store.com",
    note: "We reply within 24 hours",
  },
  {
    icon: "map-pin" as const,
    label: "Address",
    value: "123 Commerce Avenue",
    note: "New York, NY 10001, USA",
  },
  {
    icon: "clock" as const,
    label: "Business Hours",
    value: "Monday – Friday",
    note: "9:00 am – 6:00 pm EST",
  },
];

const FAQ_ITEMS = [
  { q: "How do I track my order?", a: "Go to My Orders in your account tab and tap any order to see real-time tracking." },
  { q: "Can I change my order after placing it?", a: "Orders can be modified within 1 hour of placement. Contact support immediately if you need to make changes." },
  { q: "How long do refunds take?", a: "Approved refunds are processed within 3 business days and appear in your account within 5–10 business days." },
];

export default function ContactUs() {
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
      <View style={[styles.heroBanner, { backgroundColor: colors.primaryOpacity, borderColor: colors.border }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
          <Feather name="headphones" size={ms(28)} color={colors.white} />
        </View>
        <SizedBox height={12} />
        <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary, textAlign: "center" }}>
          We're here to help
        </AppText>
        <SizedBox height={6} />
        <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, textAlign: "center", lineHeight: ms(20) }}>
          Reach out through any channel below and our team will get back to you as quickly as possible.
        </AppText>
      </View>

      <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
        Contact Methods
      </AppText>

      {CONTACT_METHODS.map((method) => (
        <Pressable
          key={method.label}
          style={({ pressed }) => [
            styles.contactCard,
            { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.primaryOpacity }]}>
            <Feather name={method.icon} size={ms(20)} color={colors.primary} />
          </View>
          <View style={styles.contactText}>
            <AppText font="Medium" fontSize="SubText" style={{ color: colors.textSecondary }}>
              {method.label}
            </AppText>
            <AppText font="SemiBold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
              {method.value}
            </AppText>
            <AppText font="Normal" fontSize="SubText" style={{ color: colors.textSecondary }}>
              {method.note}
            </AppText>
          </View>
          <Feather name="chevron-right" size={ms(18)} color={colors.textSecondary} />
        </Pressable>
      ))}

      <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
        Frequently Asked
      </AppText>

      {FAQ_ITEMS.map((faq, index) => (
        <View key={index} style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText font="SemiBold" fontSize="SubTitle" style={{ color: colors.textPrimary, lineHeight: ms(20) }}>
            {faq.q}
          </AppText>
          <SizedBox height={6} />
          <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, lineHeight: ms(20) }}>
            {faq.a}
          </AppText>
        </View>
      ))}

      <View style={[styles.responseNote, { backgroundColor: colors.primaryOpacity, borderColor: colors.primary }]}>
        <Feather name="info" size={ms(16)} color={colors.primary} />
        <AppText font="Medium" fontSize="SubText" style={{ color: colors.primary, flex: 1, lineHeight: ms(18) }}>
          Average response time is under 2 hours during business hours. For urgent issues, please call us directly.
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ms(16),
    gap: ms(12),
  },
  heroBanner: {
    borderRadius: ms(18),
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: ms(24),
    paddingHorizontal: ms(20),
  },
  heroIcon: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(30),
    alignItems: "center",
    justifyContent: "center",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(14),
    borderRadius: ms(14),
    borderWidth: 1,
    padding: ms(14),
  },
  contactIcon: {
    width: ms(44),
    height: ms(44),
    borderRadius: ms(12),
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    flex: 1,
    gap: ms(2),
  },
  faqCard: {
    borderRadius: ms(14),
    borderWidth: 1,
    padding: ms(14),
  },
  responseNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ms(10),
    borderRadius: ms(12),
    borderWidth: 1,
    padding: ms(14),
  },
});
