import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { AccountMetric, AccountProfile } from "./data";

interface ProfileHeroProps {
  profile: AccountProfile;
  metrics: AccountMetric[];
}

export default function ProfileHero({ profile, metrics }: ProfileHeroProps) {
  const { themeStyle, theme } = useThemeStyle(styles);

  return (
    <View style={themeStyle.wrap}>
      <LinearGradient
        colors={
          theme.isDark
            ? [theme.colors.surface, "#2A3226", "#171A16"]
            : [theme.colors.surface, "#F0F6E7", "#E6EFDA"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={themeStyle.card}
      >
        <View style={themeStyle.topRow}>
          <View style={themeStyle.avatar}>
            <AppText font="Bold" fontSize="Title" style={themeStyle.avatarText}>
              {profile.initials}
            </AppText>
          </View>
          <View style={themeStyle.tierPill}>
            <AppText font="SemiBold" fontSize="SubText" style={themeStyle.tierText}>
              {profile.tier}
            </AppText>
          </View>
        </View>

        <View style={themeStyle.copy}>
          <AppText font="Bold" fontSize="HeroText" style={themeStyle.name}>
            {profile.name}
          </AppText>
          <AppText font="Medium" fontSize="SubTitle" style={themeStyle.subText}>
            {profile.email}
          </AppText>
          <AppText font="Medium" fontSize="Text" style={themeStyle.metaText}>
            {profile.joined}
          </AppText>
        </View>

        <View style={themeStyle.metricRow}>
          {metrics.map((item) => (
            <View key={item.label} style={themeStyle.metricCard}>
              <AppText font="Bold" fontSize="Title" style={themeStyle.metricValue}>
                {item.value}
              </AppText>
              <AppText font="Medium" fontSize="SubText" style={themeStyle.metricLabel}>
                {item.label}
              </AppText>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    wrap: {
      borderRadius: ms(30),
      overflow: "hidden",
    },
    card: {
      borderRadius: ms(30),
      padding: ms(18),
      borderWidth: 1,
      borderColor: colors.border,
      gap: ms(18),
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    avatar: {
      width: ms(64),
      height: ms(64),
      borderRadius: ms(24),
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      color: colors.white,
    },
    tierPill: {
      borderRadius: ms(999),
      paddingHorizontal: ms(12),
      paddingVertical: ms(7),
      backgroundColor: colors.primaryOpacity,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    tierText: {
      color: colors.primary,
    },
    copy: {
      gap: ms(4),
    },
    name: {
      color: colors.textPrimary,
    },
    subText: {
      color: colors.textPrimary,
    },
    metaText: {
      color: colors.textSecondary,
    },
    metricRow: {
      flexDirection: "row",
      gap: ms(10),
    },
    metricCard: {
      flex: 1,
      borderRadius: ms(20),
      paddingVertical: ms(12),
      paddingHorizontal: ms(10),
      backgroundColor: colors.lightBlurBackDrop,
      borderWidth: 1,
      borderColor: colors.border,
      gap: ms(2),
    },
    metricValue: {
      color: colors.textPrimary,
    },
    metricLabel: {
      color: colors.textSecondary,
    },
  });
