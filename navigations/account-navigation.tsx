import ScreenHeader from "@/components/nav-header/screen-header";
import { Screen } from "@/constants/screens";
import useTheme from "@/core/theme/theme-context";
import { Stack } from "expo-router";
import React from "react";

export default function AccountNavigation() {
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
        name={Screen.Account.dashboard}
        options={{ title: "My account" }}
      />
      <Stack.Screen
        name={Screen.Account.address}
        options={{ title: "My addresses" }}
      />
      <Stack.Screen
        name={Screen.Account.orders}
        options={{ title: "My orders" }}
      />
      <Stack.Screen
        name={Screen.Account.wish_list}
        options={{ title: "Wish list" }}
      />
      <Stack.Screen
        name={Screen.Account.notification}
        options={{ title: "Notifications" }}
      />
    </Stack>
  );
}
