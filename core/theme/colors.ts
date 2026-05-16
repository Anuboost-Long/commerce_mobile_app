export const DarkThemeColors = {
  text: "#FFFFFF",
  primary: "#83b735",
  primaryOpacity: "rgba(131, 183, 53,0.3)",
  blurBackDrop: "rgba(0, 0, 0, 0.2)",
  backDrop: "rgba(0, 0, 0,0.3)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.2)",
  // background: "#121610",
  background: "#121212",
  surface: "#1E1E1E",
  border: "#2A3226",
  textPrimary: "#E6F0D8",
  textSecondary: "#A6B29A",
  white: "#FFFFFF",
  inActive: "#8A8F99",
};

export const LightThemeColors = {
  text: "#000000",
  blurBackDrop: "rgba(255, 255, 255, 0.5)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.2)",
  backDrop: "rgba(0, 0, 0,0.3)",
  // background: "#F3F7EE",
  background: "#F8F9FA",
  surface: "#FBFDF9",
  border: "#DCE6CF",
  textPrimary: "#1E2B18",
  textSecondary: "#5C6F52",
  primary: "#83b735",
  primaryOpacity: "rgba(131, 183, 53,0.3)",
  white: "#FFFFFF",
  inActive: "#4F535D",
};

export const NeutralThemeColors = {
  text: "#FFFFFF",
  primary: "#2C7DA0",
  primaryOpacity: "rgba(44, 125, 160, 0.3)",
  blurBackDrop: "rgba(0, 0, 0, 0.2)",
  backDrop: "rgba(0, 0, 0, 0.3)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.2)",
  background: "#121212",
  surface: "#1E1E1E",
  border: "#2D3E40",
  textPrimary: "#E8F0F2",
  textSecondary: "#9BB8C4",
  white: "#FFFFFF",
  inActive: "#8A8F99",
};

export const NeutralLightThemeColors = {
  text: "#000000",
  blurBackDrop: "rgba(255, 255, 255, 0.5)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.2)",
  backDrop: "rgba(0, 0, 0, 0.3)",
  background: "#F4F8FA",
  surface: "#FFFFFF",
  border: "#CFDFE5",
  textPrimary: "#1B3B44",
  textSecondary: "#5E8B9B",
  primary: "#2C7DA0",
  primaryOpacity: "rgba(44, 125, 160, 0.3)",
  white: "#FFFFFF",
  inActive: "#6C7A7F",
};

export const MenThemeColors = {
  text: "#FFFFFF",
  primary: "#1E5F5A",
  primaryOpacity: "rgba(30, 95, 90, 0.3)",
  blurBackDrop: "rgba(0, 0, 0, 0.25)",
  backDrop: "rgba(0, 0, 0, 0.4)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.15)",
  background: "#0F1717",
  surface: "#1C2626",
  border: "#2F403E",
  textPrimary: "#E2F0EF",
  textSecondary: "#8FA8A5",
  white: "#FFFFFF",
  inActive: "#6F7E7C",
};

export const MenLightThemeColors = {
  text: "#000000",
  blurBackDrop: "rgba(255, 255, 255, 0.6)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.25)",
  backDrop: "rgba(0, 0, 0, 0.3)",
  background: "#ECF3F2",
  surface: "#FFFFFF",
  border: "#C7DBD8",
  textPrimary: "#1A2F2D",
  textSecondary: "#4D6C68",
  primary: "#1E5F5A",
  primaryOpacity: "rgba(30, 95, 90, 0.3)",
  white: "#FFFFFF",
  inActive: "#5F7370",
};

export const WomenThemeColors = {
  text: "#FFFFFF",
  primary: "#D45A7A",
  primaryOpacity: "rgba(212, 90, 122, 0.3)",
  blurBackDrop: "rgba(0, 0, 0, 0.2)",
  backDrop: "rgba(0, 0, 0, 0.3)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.2)",
  background: "#1E181C",
  surface: "#2A2126",
  border: "#4A353F",
  textPrimary: "#FDE8EF",
  textSecondary: "#D4B1BC",
  white: "#FFFFFF",
  inActive: "#8F7A82",
};

export const WomenLightThemeColors = {
  text: "#000000",
  blurBackDrop: "rgba(255, 255, 255, 0.5)",
  lightBlurBackDrop: "rgba(255, 255, 255, 0.2)",
  backDrop: "rgba(0, 0, 0, 0.3)",
  background: "#FEF6F8",
  surface: "#FFFFFF",
  border: "#F0DDE3",
  textPrimary: "#4B2D38",
  textSecondary: "#B28A99",
  primary: "#D45A7A",
  primaryOpacity: "rgba(212, 90, 122, 0.3)",
  white: "#FFFFFF",
  inActive: "#9A818B",
};

export const ThemePalette = {
  default: {
    light: LightThemeColors,
    dark: DarkThemeColors,
  },
  neutral: {
    light: NeutralLightThemeColors,
    dark: NeutralThemeColors,
  },
  men: {
    light: MenLightThemeColors,
    dark: MenThemeColors,
  },
  women: {
    light: WomenLightThemeColors,
    dark: WomenThemeColors,
  },
} as const;

export type ThemePaletteName = keyof typeof ThemePalette;
