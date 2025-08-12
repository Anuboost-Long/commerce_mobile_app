import React, { createContext } from "react";
import { LightThemeColors } from "./colors";
import { Theme } from "./type";

export const ThemeContext = createContext<Theme>({
  isDark: false,
  colors: LightThemeColors,
});

export default function ThemeProvider({
  children,
  value,
}: {
  value: Theme;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
