import ScreenHeader from "@/components/nav-header/screen-header";
import { Screen } from "@/constants/screens";
import useTheme from "@/core/theme/theme-context";
import { Stack } from "expo-router";
import React from "react";

export default function AuthNavigation() {
  const { colors } = useTheme();

  const RenderScreenHeader = (prop: any) => {
    const title = prop.options.title ?? "";

    return (
      <ScreenHeader
        headerKey="tab_header"
        title={title}
      />
    );
  };

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background,
        },
        header: RenderScreenHeader,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name={Screen.Auth.sign_in}
        options={{ title: "Sign in" }}
      />
      <Stack.Screen
        name={Screen.Auth.sign_up}
        options={{ title: "Sign up" }}
      />
      <Stack.Screen
        name={Screen.Auth.forget_password}
        options={{ title: "Forgot password" }}
      />
      <Stack.Screen
        name={Screen.Auth.verify}
        options={{ title: "Verify" }}
      />
    </Stack>
  );
}
