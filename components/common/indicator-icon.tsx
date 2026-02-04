import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import AppText from "./app-text";

interface IndicatorIconProp {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  number: number;
}

export default function IndicatorIcon({ icon, number }: IndicatorIconProp) {
  const { theme, themeStyle } = useThemeStyle(styles);
  const Icon = icon;
  return (
    <View>
      <Icon width={ms(22)} height={ms(22)} fill={theme.colors.primary} />
      {number > 0 && (
        <View style={themeStyle.badge}>
          <AppText
            fontSize="Indicator"
            font="SemiBold"
            style={themeStyle.badgeText}
          >
            {number > 99 ? "99+" : number}
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    badge: {
      height: ms(16),
      width: ms(16),
      backgroundColor: colors.textSecondary,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      borderRadius: ms(15),
      right: ms(-5),
      top: ms(-5),
    },
    badgeText: {
      color: colors.white,
    },
  });
