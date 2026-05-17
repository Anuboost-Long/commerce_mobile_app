import useTheme from "@/core/theme/theme-context";
import type { ThemeColor } from "@/core/theme/type";

export const getCartPalette = (colors: ThemeColor) => ({
  screen: colors.background,
  card: colors.surface,
  cardStrong: colors.surface,
  cardSoft: colors.primaryOpacity,
  glass: colors.lightBlurBackDrop,
  border: colors.border,
  text: colors.textPrimary,
  subtext: colors.textSecondary,
  accent: colors.primary,
  accentStrong: colors.primary,
  accentSoft: colors.primaryOpacity,
  lavender: colors.primaryOpacity,
  roseGold: colors.primary,
  success: colors.primary,
  warning: "#D08A1F",
  danger: "#D94A4A",
  shadow: colors.backDrop,
  white: colors.white,
});

export const useCartPalette = () => {
  const theme = useTheme();

  return getCartPalette(theme.colors);
};

export type CartPalette = ReturnType<typeof getCartPalette>;
