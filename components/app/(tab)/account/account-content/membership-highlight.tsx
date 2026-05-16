import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { MembershipData } from "./data";

interface MembershipHighlightProps {
  membership: MembershipData;
}

export default function MembershipHighlight({
  membership,
}: MembershipHighlightProps) {
  const { themeStyle } = useThemeStyle(styles);

  return (
    <View style={themeStyle.container}>
      <AppText font="SemiBold" fontSize="SubText" style={themeStyle.eyebrow}>
        {membership.eyebrow}
      </AppText>
      <AppText font="Bold" fontSize="Title" style={themeStyle.title}>
        {membership.title}
      </AppText>
      <AppText font="Medium" fontSize="Text" style={themeStyle.caption}>
        {membership.caption}
      </AppText>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      borderRadius: ms(26),
      padding: ms(18),
      backgroundColor: colors.primary,
      gap: ms(8),
    },
    eyebrow: {
      color: colors.white,
      opacity: 0.85,
      letterSpacing: 1,
    },
    title: {
      color: colors.white,
      lineHeight: ms(28),
    },
    caption: {
      color: colors.white,
      opacity: 0.88,
      lineHeight: ms(18),
    },
  });
