import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { LocationItem } from "./data";
import PanelShell from "./panel-shell";
import SectionTitle from "./section-title";

interface SavedLocationsProps {
  locations: LocationItem[];
}

export default function SavedLocations({ locations }: SavedLocationsProps) {
  const { themeStyle } = useThemeStyle(styles);

  return (
    <PanelShell>
      <SectionTitle
        eyebrow="DELIVERY"
        title="Saved locations"
        caption="The account keeps multiple delivery points ready at checkout."
      />
      <View style={themeStyle.stack}>
        {locations.map((item) => (
          <View key={item.label} style={themeStyle.card}>
            <View style={themeStyle.header}>
              <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.label}>
                {item.label}
              </AppText>
              <View style={themeStyle.badge}>
                <AppText font="SemiBold" fontSize="SubText" style={themeStyle.badgeText}>
                  {item.status}
                </AppText>
              </View>
            </View>
            <AppText font="Medium" fontSize="Text" style={themeStyle.line}>
              {item.line1}
            </AppText>
            <AppText font="Medium" fontSize="Text" style={themeStyle.line}>
              {item.line2}
            </AppText>
            <AppText font="Medium" fontSize="SubText" style={themeStyle.note}>
              {item.note}
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
      gap: ms(10),
    },
    card: {
      borderRadius: ms(20),
      padding: ms(14),
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      gap: ms(6),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      color: colors.textPrimary,
    },
    badge: {
      borderRadius: ms(999),
      paddingHorizontal: ms(10),
      paddingVertical: ms(5),
      backgroundColor: colors.primaryOpacity,
    },
    badgeText: {
      color: colors.primary,
    },
    line: {
      color: colors.textPrimary,
      lineHeight: ms(18),
    },
    note: {
      color: colors.textSecondary,
    },
  });
