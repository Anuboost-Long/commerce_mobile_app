import { IconAsset } from "@/assets/icon-asset";
import AppText from "@/components/common/app-text";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

const notification = {
  title: "Your order has been confirmed",
  sentAt: "May 17, 2026",
};

export default function Notification() {
  const { themeStyle, theme } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();

  return (
    <ScrollView
      style={themeStyle.screen}
      contentContainerStyle={[
        themeStyle.contentContainer,
        { paddingTop: tab_header + ms(12) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={themeStyle.card}>
        <View style={themeStyle.iconWrap}>
          <IconAsset.Bell
            width={ms(20)}
            height={ms(20)}
            fill={theme.colors.primary}
          />
        </View>
        <View style={themeStyle.textWrap}>
          <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.title}>
            {notification.title}
          </AppText>
          <AppText font="Medium" fontSize="Text" style={themeStyle.date}>
            {notification.sentAt}
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingHorizontal: ms(14),
      paddingBottom: ms(24),
    },
    card: {
      borderRadius: ms(18),
      padding: ms(14),
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: ms(12),
    },
    iconWrap: {
      width: ms(42),
      height: ms(42),
      borderRadius: ms(16),
      backgroundColor: colors.primaryOpacity,
      alignItems: "center",
      justifyContent: "center",
    },
    textWrap: {
      flex: 1,
      gap: ms(4),
    },
    title: {
      color: colors.textPrimary,
    },
    date: {
      color: colors.textSecondary,
    },
  });
