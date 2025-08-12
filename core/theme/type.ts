import { LightThemeColors } from "./colors";

export type ThemeColor = typeof LightThemeColors;

export type Theme = {
  isDark: boolean;
  colors: ThemeColor;
};
