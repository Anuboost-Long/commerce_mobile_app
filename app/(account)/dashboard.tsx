import PanelShell from "@/components/app/(tab)/account/account-content/panel-shell";
import SectionTitle from "@/components/app/(tab)/account/account-content/section-title";
import {
  accountProfile,
  membership,
  recentActivity,
  summaryMetrics,
} from "@/components/app/(tab)/account/account-content/data";
import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const VOUCHERS = [
  { code: "FREESHIP50", label: "Free shipping", desc: "On orders over $50", expiry: "Jun 30, 2026" },
  { code: "SAVE15",     label: "15% off",       desc: "Any single item",    expiry: "May 31, 2026" },
];

const POINTS_EARNED = 420;
const POINTS_TOTAL  = 1000;

export default function Page() {
  const { themeStyle, theme } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();
  const progress = POINTS_EARNED / POINTS_TOTAL;

  return (
    <ScrollView
      style={themeStyle.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        themeStyle.content,
        { paddingTop: tab_header + ms(12), paddingBottom: Math.max(insets.bottom, ms(24)) },
      ]}
    >
      {/* Profile mini card */}
      <LinearGradient
        colors={theme.isDark ? [theme.colors.surface, "#2A3226"] : [theme.colors.surface, "#EEF6E2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={themeStyle.profileCard}
      >
        <View style={themeStyle.avatar}>
          <AppText font="Bold" fontSize="Title" style={themeStyle.avatarText}>
            {accountProfile.initials}
          </AppText>
        </View>
        <View style={themeStyle.profileCopy}>
          <AppText font="Bold" fontSize="SubTitle" style={themeStyle.profileName}>
            {accountProfile.name}
          </AppText>
          <AppText font="Normal" fontSize="SubText" style={themeStyle.profileMeta}>
            {accountProfile.email}
          </AppText>
        </View>
        <View style={themeStyle.tierPill}>
          <AppText font="SemiBold" fontSize="SubText" style={themeStyle.tierText}>
            {accountProfile.tier}
          </AppText>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={themeStyle.statsRow}>
        {summaryMetrics.map((m, i) => (
          <View key={m.label} style={[themeStyle.statCard, i === 1 && themeStyle.statCardAccent]}>
            <AppText font="Bold" fontSize="Title" style={[themeStyle.statValue, i === 1 && themeStyle.statValueAccent]}>
              {m.value}
            </AppText>
            <AppText font="Medium" fontSize="SubText" style={[themeStyle.statLabel, i === 1 && themeStyle.statLabelAccent]}>
              {m.label}
            </AppText>
          </View>
        ))}
      </View>

      {/* Rewards progress */}
      <PanelShell>
        <SectionTitle
          eyebrow={membership.eyebrow}
          title={membership.title}
          caption={membership.caption}
        />
        <View style={themeStyle.progressTrack}>
          <View style={[themeStyle.progressFill, { width: `${Math.round(progress * 100)}%` as any }]} />
        </View>
        <View style={themeStyle.progressLabels}>
          <AppText font="SemiBold" fontSize="SubText" style={themeStyle.progressCurrent}>
            {POINTS_EARNED} pts
          </AppText>
          <AppText font="Normal" fontSize="SubText" style={themeStyle.progressGoal}>
            {POINTS_TOTAL} pts to Platinum
          </AppText>
        </View>
      </PanelShell>

      {/* Vouchers */}
      <PanelShell>
        <SectionTitle
          eyebrow="OFFERS"
          title="Your vouchers"
          caption="Apply these at checkout to save on your next order."
        />
        {VOUCHERS.map((v) => (
          <View key={v.code} style={themeStyle.voucherCard}>
            <View style={themeStyle.voucherLeft}>
              <AppText font="Bold" fontSize="SubTitle" style={themeStyle.voucherLabel}>{v.label}</AppText>
              <AppText font="Normal" fontSize="SubText" style={themeStyle.voucherDesc}>{v.desc}</AppText>
              <AppText font="Medium" fontSize="SubText" style={themeStyle.voucherExpiry}>Expires {v.expiry}</AppText>
            </View>
            <View style={themeStyle.voucherCodeWrap}>
              <AppText font="Bold" fontSize="SubText" style={themeStyle.voucherCode}>{v.code}</AppText>
            </View>
          </View>
        ))}
      </PanelShell>

      {/* Recent activity */}
      <PanelShell>
        <SectionTitle
          eyebrow="UPDATES"
          title="Recent activity"
          caption="Your latest account events and notifications."
        />
        <View style={themeStyle.activityStack}>
          {recentActivity.map((item) => (
            <View key={item.title} style={themeStyle.activityRow}>
              <View style={themeStyle.activityDot} />
              <View style={themeStyle.activityText}>
                <AppText font="SemiBold" fontSize="Text" style={themeStyle.activityTitle}>{item.title}</AppText>
                <AppText font="Normal" fontSize="SubText" style={themeStyle.activitySub}>{item.subtitle}</AppText>
              </View>
            </View>
          ))}
        </View>
      </PanelShell>
    </ScrollView>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    screen:   { flex: 1, backgroundColor: colors.background },
    content:  { paddingHorizontal: ms(16), gap: ms(12) },
    profileCard: {
      borderRadius: ms(22),
      borderWidth: 1,
      borderColor: colors.border,
      padding: ms(14),
      flexDirection: "row",
      alignItems: "center",
      gap: ms(12),
    },
    avatar: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(16),
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText:   { color: colors.white },
    profileCopy:  { flex: 1, gap: ms(2) },
    profileName:  { color: colors.textPrimary },
    profileMeta:  { color: colors.textSecondary },
    tierPill: {
      borderRadius: ms(999),
      paddingHorizontal: ms(10),
      paddingVertical: ms(5),
      backgroundColor: colors.primaryOpacity,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    tierText: { color: colors.primary },
    statsRow: { flexDirection: "row", gap: ms(10) },
    statCard: {
      flex: 1,
      borderRadius: ms(16),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingVertical: ms(14),
      paddingHorizontal: ms(10),
      gap: ms(3),
      alignItems: "center",
    },
    statCardAccent:   { backgroundColor: colors.primary, borderColor: colors.primary },
    statValue:        { color: colors.textPrimary },
    statValueAccent:  { color: colors.white },
    statLabel:        { color: colors.textSecondary },
    statLabelAccent:  { color: colors.white, opacity: 0.85 },
    progressTrack: {
      height: ms(8),
      borderRadius: ms(999),
      backgroundColor: colors.border,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: ms(999),
      backgroundColor: colors.primary,
    },
    progressLabels:  { flexDirection: "row", justifyContent: "space-between" },
    progressCurrent: { color: colors.primary },
    progressGoal:    { color: colors.textSecondary },
    voucherCard: {
      borderRadius: ms(14),
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: "dashed",
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    voucherLeft:    { flex: 1, padding: ms(12), gap: ms(2) },
    voucherLabel:   { color: colors.textPrimary },
    voucherDesc:    { color: colors.textSecondary },
    voucherExpiry:  { color: colors.textSecondary, marginTop: ms(4) },
    voucherCodeWrap: {
      width: ms(80),
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primaryOpacity,
      borderLeftWidth: 1,
      borderLeftColor: colors.primary,
      borderStyle: "dashed",
      padding: ms(8),
    },
    voucherCode:   { color: colors.primary, textAlign: "center" },
    activityStack: { gap: ms(12) },
    activityRow:   { flexDirection: "row", alignItems: "flex-start", gap: ms(10) },
    activityDot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(999),
      marginTop: ms(4),
      backgroundColor: colors.primary,
    },
    activityText:  { flex: 1, gap: ms(2) },
    activityTitle: { color: colors.textPrimary },
    activitySub:   { color: colors.textSecondary, lineHeight: ms(16) },
  });
