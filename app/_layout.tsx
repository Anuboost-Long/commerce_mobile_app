import { useFonts } from "expo-font";
import "react-native-reanimated";

import {
  ThemePalette,
  ThemePaletteName,
} from "@/core/theme/colors";
import ThemeProvider from "@/core/theme/theme-provider";
import RootNavigation from "@/navigations/root-navigation";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "@/core/translation/i18n.config";

// Gesture Handler needs eager module initialization before app render.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("react-native-gesture-handler");

const ACTIVE_THEME: ThemePaletteName = "default";

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

  const selectedTheme = ThemePalette[ACTIVE_THEME];
  const isLight = colorScheme === "light";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={
          isLight
            ? { isDark: false, colors: selectedTheme.light }
            : { isDark: true, colors: selectedTheme.dark }
        }
      >
        <StatusBar style={"auto"} />
        <RootNavigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
