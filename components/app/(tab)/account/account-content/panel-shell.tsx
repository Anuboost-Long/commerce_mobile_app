import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function PanelShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { themeStyle } = useThemeStyle(styles);

  return <View style={themeStyle.container}>{children}</View>;
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      borderRadius: ms(26),
      padding: ms(16),
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      gap: ms(14),
    },
  });
