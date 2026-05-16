import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  caption: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  caption,
}: SectionTitleProps) {
  const { themeStyle } = useThemeStyle(styles);

  return (
    <View style={themeStyle.container}>
      <AppText font="SemiBold" fontSize="SubText" style={themeStyle.eyebrow}>
        {eyebrow}
      </AppText>
      <AppText font="Bold" fontSize="Title" style={themeStyle.title}>
        {title}
      </AppText>
      <AppText font="Medium" fontSize="Text" style={themeStyle.caption}>
        {caption}
      </AppText>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      gap: ms(4),
    },
    eyebrow: {
      color: colors.primary,
      letterSpacing: 1.1,
    },
    title: {
      color: colors.textPrimary,
    },
    caption: {
      color: colors.textSecondary,
      lineHeight: ms(18),
    },
  });
