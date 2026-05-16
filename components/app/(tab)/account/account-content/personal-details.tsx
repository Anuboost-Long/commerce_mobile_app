import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { ContactDetailItem } from "./data";
import PanelShell from "./panel-shell";
import SectionTitle from "./section-title";

interface PersonalDetailsProps {
  details: ContactDetailItem[];
}

export default function PersonalDetails({ details }: PersonalDetailsProps) {
  const { themeStyle, theme } = useThemeStyle(styles);

  return (
    <PanelShell>
      <SectionTitle
        eyebrow="CONTACT"
        title="Personal details"
        caption="Mocked identity and communication details for the signed-in user."
      />
      <View style={themeStyle.stack}>
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <View key={item.label} style={themeStyle.row}>
              <View style={themeStyle.iconWrap}>
                <Icon width={ms(18)} height={ms(18)} fill={theme.colors.primary} />
              </View>
              <View style={themeStyle.textWrap}>
                <AppText font="Medium" fontSize="SubText" style={themeStyle.label}>
                  {item.label}
                </AppText>
                <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.value}>
                  {item.value}
                </AppText>
              </View>
            </View>
          );
        })}
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
      gap: ms(10),
      alignItems: "center",
    },
    iconWrap: {
      width: ms(38),
      height: ms(38),
      borderRadius: ms(14),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primaryOpacity,
    },
    textWrap: {
      flex: 1,
      gap: ms(1),
    },
    label: {
      color: colors.textSecondary,
      letterSpacing: 0.4,
    },
    value: {
      color: colors.textPrimary,
    },
  });
