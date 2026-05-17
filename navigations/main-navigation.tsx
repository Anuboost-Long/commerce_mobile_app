import ScreenHeader from "@/components/nav-header/screen-header";
import { Screen } from "@/constants/screens";
import useTheme from "@/core/theme/theme-context";
import { Stack } from "expo-router";
import React from "react";

export default function MainNavigation() {
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
        name={Screen.Main.about_us}
        options={{ title: "About us" }}
      />
      <Stack.Screen
        name={Screen.Main.blog}
        options={{ title: "Blog" }}
      />
      <Stack.Screen
        name={Screen.Main.contact_us}
        options={{ title: "Contact us" }}
      />
      <Stack.Screen
        name={Screen.Main.privacy_policies}
        options={{ title: "Privacy policies" }}
      />
      <Stack.Screen
        name={Screen.Main.refund_return_policies}
        options={{ title: "Refund & return" }}
      />
      <Stack.Screen
        name={Screen.Main.shipping_policies}
        options={{ title: "Shipping policies" }}
      />
      <Stack.Screen
        name={Screen.Main.term_conditions}
        options={{ title: "Terms & conditions" }}
      />
      <Stack.Screen
        name={Screen.Main.setting}
        options={{ title: "Settings" }}
      />
    </Stack>
  );
}
