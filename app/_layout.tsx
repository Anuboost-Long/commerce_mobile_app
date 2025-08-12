import { useFonts } from "expo-font";
import "react-native-reanimated";

import { DarkThemeColors, LightThemeColors } from "@/core/theme/colors";
import ThemeProvider from "@/core/theme/theme-provider";
import { useColorScheme } from "@/hooks/useColorScheme";
import RootNavigation from "@/navigations/root-navigation";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppin: require("@/assets/fonts/Poppins-Regular.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={
        colorScheme === "light"
          ? { isDark: false, colors: LightThemeColors }
          : { isDark: true, colors: DarkThemeColors }
      }
    >
      <StatusBar style={"auto"} />
      <RootNavigation />
    </ThemeProvider>
  );
}
