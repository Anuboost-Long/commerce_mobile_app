import { EnglishFont, FontKey, KhmerFont } from "@/constants/fonts";
import { FontSizeKey, FontSizes } from "@/constants/fontsize";
import { Languages } from "@/constants/languages";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface AppTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  font?: FontKey;
  fontSize?: FontSizeKey;
}

export default function AppText({
  children,
  style,
  font = "Normal",
  fontSize = "Text",
}: AppTextProps) {
  const { themeStyle, i18n } = useThemeStyle(styles);
  return (
    <Text
      style={[
        themeStyle.text,
        {
          fontFamily:
            i18n.language === Languages.en
              ? EnglishFont[font]
              : KhmerFont[font],

          fontSize: FontSizes[fontSize],
        },

        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    text: {
      color: colors.textPrimary,
    },
  });
