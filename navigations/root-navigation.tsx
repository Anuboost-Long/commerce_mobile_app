import useTheme from "@/core/theme/theme-context";
import { Stack } from "expo-router";
import React from "react";
import { ScreenName } from "./_route";

export default function RootNavigation() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "",
          flex: 1,
        },
      }}
    >
      <Stack.Screen name={ScreenName.SplashScreen} />
      <Stack.Screen name={ScreenName.Main.index} />
      <Stack.Screen name={ScreenName.Auth.index} />
    </Stack>
  );
}
