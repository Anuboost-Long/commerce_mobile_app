import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const STATS = [
  { value: "2018", label: "Founded" },
  { value: "500K+", label: "Customers" },
  { value: "10K+", label: "Products" },
];

const VALUES = [
  {
    icon: "shield" as const,
    title: "Trust & Safety",
    body: "Every product is verified and every transaction is protected with industry-standard encryption.",
  },
  {
    icon: "zap" as const,
    title: "Fast Delivery",
    body: "We partner with top-tier logistics providers to get your order to your door as quickly as possible.",
  },
  {
    icon: "heart" as const,
    title: "Customer First",
    body: "Our support team is available seven days a week to ensure your experience is always exceptional.",
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
      contentContainerStyle={{
        paddingTop: tab_header + ms(12),
        paddingBottom: Math.max(insets.bottom, ms(24)),
      }}
    >
      <View style={[styles.hero, { backgroundColor: colors.primaryOpacity, borderColor: colors.border }]}>
        <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
          <Feather name="shopping-bag" size={ms(32)} color={colors.white} />
        </View>
        <SizedBox height={14} />
        <AppText font="Bold" fontSize="Title" style={{ color: colors.textPrimary, textAlign: "center" }}>
          Commerce Store
        </AppText>
        <SizedBox height={6} />
        <AppText font="Medium" fontSize="SubTitle" style={{ color: colors.textSecondary, textAlign: "center" }}>
          Your trusted destination for quality products
        </AppText>
      </View>

      <View style={[styles.statsRow, { borderBottomColor: colors.border, borderTopColor: colors.border }]}>
        {STATS.map((stat, index) => (
          <React.Fragment key={stat.label}>
            {index > 0 && <View style={[styles.statDivider, { backgroundColor: colors.border }]} />}
            <View style={styles.statItem}>
              <AppText font="Bold" fontSize="Title" style={{ color: colors.primary }}>
                {stat.value}
              </AppText>
              <SizedBox height={2} />
              <AppText font="Medium" fontSize="SubText" style={{ color: colors.textSecondary }}>
                {stat.label}
              </AppText>
            </View>
          </React.Fragment>
        ))}
      </View>

      <View style={styles.section}>
        <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
          Our Story
        </AppText>
        <SizedBox height={10} />
        <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, lineHeight: ms(22) }}>
          Founded in 2018, we started with a simple belief — shopping should be effortless, enjoyable, and accessible to everyone. What began as a small curated catalogue has grown into a platform trusted by hundreds of thousands of customers across the globe.
        </AppText>
        <SizedBox height={10} />
        <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, lineHeight: ms(22) }}>
          We work directly with manufacturers and independent brands to bring you genuine products at fair prices. Every item listed on our platform is quality-checked before it reaches you.
        </AppText>
      </View>

      <View style={[styles.missionCard, { backgroundColor: colors.primary }]}>
        <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.white }}>
          Our Mission
        </AppText>
        <SizedBox height={8} />
        <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.white, lineHeight: ms(22), opacity: 0.9 }}>
          To make quality products accessible to everyone, everywhere — while delivering an experience so seamless it feels effortless.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
          Our Values
        </AppText>
        <SizedBox height={12} />
        <View style={styles.valuesCol}>
          {VALUES.map((value) => (
            <View key={value.title} style={[styles.valueCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.valueIcon, { backgroundColor: colors.primaryOpacity }]}>
                <Feather name={value.icon} size={ms(20)} color={colors.primary} />
              </View>
              <View style={styles.valueCopy}>
                <AppText font="SemiBold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
                  {value.title}
                </AppText>
                <SizedBox height={4} />
                <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, lineHeight: ms(20) }}>
                  {value.body}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: ms(16),
    borderRadius: ms(18),
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: ms(28),
    paddingHorizontal: ms(20),
  },
  logoCircle: {
    width: ms(72),
    height: ms(72),
    borderRadius: ms(36),
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: ms(20),
    paddingVertical: ms(18),
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: ms(36),
  },
  section: {
    paddingHorizontal: ms(16),
    paddingTop: ms(22),
  },
  missionCard: {
    marginHorizontal: ms(16),
    marginTop: ms(22),
    borderRadius: ms(16),
    padding: ms(20),
  },
  valuesCol: {
    gap: ms(10),
  },
  valueCard: {
    flexDirection: "row",
    gap: ms(14),
    borderWidth: 1,
    borderRadius: ms(14),
    padding: ms(14),
    alignItems: "flex-start",
  },
  valueIcon: {
    width: ms(42),
    height: ms(42),
    borderRadius: ms(12),
    alignItems: "center",
    justifyContent: "center",
  },
  valueCopy: {
    flex: 1,
  },
});
