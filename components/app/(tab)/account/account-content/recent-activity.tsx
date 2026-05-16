import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { ActivityItem } from "./data";
import PanelShell from "./panel-shell";
import SectionTitle from "./section-title";

interface RecentActivityProps {
  activity: ActivityItem[];
}

export default function RecentActivity({ activity }: RecentActivityProps) {
  const { themeStyle } = useThemeStyle(styles);

  return (
    <PanelShell>
      <SectionTitle
        eyebrow="UPDATES"
        title="Recent activity"
        caption="A realistic feed for recent account events."
      />
      <View style={themeStyle.stack}>
        {activity.map((item) => (
          <View key={item.title} style={themeStyle.row}>
            <View style={themeStyle.dot} />
            <View style={themeStyle.textWrap}>
              <AppText font="SemiBold" fontSize="Text" style={themeStyle.title}>
                {item.title}
              </AppText>
              <AppText font="Medium" fontSize="SubText" style={themeStyle.subtitle}>
                {item.subtitle}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </PanelShell>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    stack: {
      gap: ms(12),
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: ms(10),
    },
    dot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(999),
      marginTop: ms(4),
      backgroundColor: colors.primary,
    },
    textWrap: {
      flex: 1,
      gap: ms(2),
    },
    title: {
      color: colors.textPrimary,
    },
    subtitle: {
      color: colors.textSecondary,
      lineHeight: ms(16),
    },
  });
