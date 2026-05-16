export const getCartPalette = (isDark: boolean) => {
  if (isDark) {
    return {
      screen: "#1D1820",
      card: "rgba(46, 36, 49, 0.76)",
      cardStrong: "#2D2330",
      cardSoft: "#362A39",
      glass: "rgba(255, 255, 255, 0.08)",
      border: "rgba(255, 226, 235, 0.18)",
      text: "#FFF3F7",
      subtext: "#D8C1CB",
      accent: "#F5A8C0",
      accentStrong: "#F48FB1",
      accentSoft: "rgba(245, 168, 192, 0.18)",
      lavender: "#CDB9FF",
      roseGold: "#E8B6A7",
      success: "#94D5B8",
      warning: "#FFD59B",
      danger: "#FF9EAE",
      shadow: "rgba(0, 0, 0, 0.24)",
      white: "#FFFFFF",
    };
  }

  return {
    screen: "#FFF7FB",
    card: "rgba(255, 255, 255, 0.78)",
    cardStrong: "#FFFDFE",
    cardSoft: "#FFF0F6",
    glass: "rgba(255, 255, 255, 0.48)",
    border: "rgba(241, 196, 212, 0.48)",
    text: "#533948",
    subtext: "#8E6B7C",
    accent: "#F49CB8",
    accentStrong: "#EC7FA2",
    accentSoft: "rgba(244, 156, 184, 0.16)",
    lavender: "#D9C6FF",
    roseGold: "#D9A48F",
    success: "#73B992",
    warning: "#F2B56B",
    danger: "#E8738C",
    shadow: "rgba(170, 118, 139, 0.14)",
    white: "#FFFFFF",
  };
};

export type CartPalette = ReturnType<typeof getCartPalette>;
