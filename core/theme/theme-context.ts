import { useContext } from "react";
import { ThemeContext } from "./theme-provider";

export default function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
