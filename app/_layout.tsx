import { useFonts } from "expo-font";
import "react-native-reanimated";

import { DarkThemeColors, LightThemeColors } from "@/core/theme/colors";
import ThemeProvider from "@/core/theme/theme-provider";
import RootNavigation from "@/navigations/root-navigation";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import "@/core/translation/i18n.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    EnglishExLight: require("@/assets/fonts/en/IBMPlexSans-ExtraLight.ttf"),
    EnglishLight: require("@/assets/fonts/en/IBMPlexSans-Light.ttf"),
    EnglishNormal: require("@/assets/fonts/en/IBMPlexSans-Regular.ttf"),
    EnglishMedium: require("@/assets/fonts/en/IBMPlexSans-Medium.ttf"),
    EnglishSemiBold: require("@/assets/fonts/en/IBMPlexSans-SemiBold.ttf"),
    EnglishBold: require("@/assets/fonts/en/IBMPlexSans-Bold.ttf"),

    KhmerExLight: require("@/assets/fonts/kh/Hanuman-ExtraLight.ttf"),
    KhmerLight: require("@/assets/fonts/kh/Hanuman-Light.ttf"),
    KhmerNormal: require("@/assets/fonts/kh/Hanuman-Regular.ttf"),
    KhmerMedium: require("@/assets/fonts/kh/Hanuman-Medium.ttf"),
    KhmerSemiBold: require("@/assets/fonts/kh/Hanuman-SemiBold.ttf"),
    KhmerBold: require("@/assets/fonts/kh/Hanuman-Bold.ttf"),
  });

  if (!fontsLoaded) {
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
