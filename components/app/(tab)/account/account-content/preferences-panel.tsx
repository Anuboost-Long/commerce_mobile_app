import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { PreferenceItem } from "./data";
import PanelShell from "./panel-shell";
import SectionTitle from "./section-title";

interface PreferencesPanelProps {
  preferences: PreferenceItem[];
}

export default function PreferencesPanel({
  preferences,
}: PreferencesPanelProps) {
  const { themeStyle } = useThemeStyle(styles);

  return (
    <PanelShell>
      <SectionTitle
        eyebrow="SETTINGS"
        title="Payment and preferences"
        caption="Useful mock settings for account review and QA."
      />
      <View style={themeStyle.stack}>
        {preferences.map((item) => (
          <View key={item.label} style={themeStyle.row}>
            <AppText font="Medium" fontSize="SubText" style={themeStyle.label}>
              {item.label}
            </AppText>
            <AppText font="SemiBold" fontSize="Text" style={themeStyle.value}>
              {item.value}
            </AppText>
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
      gap: ms(4),
      paddingBottom: ms(12),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    label: {
      color: colors.textSecondary,
    },
    value: {
      color: colors.textPrimary,
      lineHeight: ms(18),
    },
  });
