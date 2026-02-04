import useTheme from "@/core/theme/theme-context";
import { ThemeColor } from "@/core/theme/type";
import { useTranslation } from "react-i18next";
import { StyleProp } from "react-native";

type Styles = {
  [key: string]: StyleProp<any>;
};

export type StyleParam = {
  colors: ThemeColor;
  language: string;
};

export default function useThemeStyle<T extends Styles>(
  styles: (param: StyleParam) => T
) {
  const theme = useTheme();
  const { i18n, t } = useTranslation();

  const themeStyle = styles({ colors: theme.colors, language: i18n.language });

  return { theme, themeStyle, t, i18n };
}
